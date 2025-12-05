// Edge Function: hyper-function
// Objetivo: Receber o target_user_id e enviar a notificação Push correspondente.

// Importa o cliente Supabase para acessar o banco de dados
import { createClient } from 'npm:@supabase/supabase-js@2';
// Importa o módulo web-push para enviar notificações
import webpush from 'npm:web-push@3.6.7';

// Define a interface para o payload que chega do frontend
interface PushPayload {
    target_user_id: string; // ID do usuário que deve receber a chamada
    caller_name: string;    // Nome do usuário que está ligando
}

// Configuração principal da função
Deno.serve(async (req) => {
    try {
        // 1. Configurações de CORS para aceitar requisições do seu frontend (Vercel)
        if (req.method === 'OPTIONS') {
            return new Response('ok', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
                },
            });
        }

        // Garante que é uma requisição POST
        if (req.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 2. Extrai o payload da requisição
        const payload: PushPayload = await req.json();
        const { target_user_id, caller_name } = payload;

        if (!target_user_id) {
            return new Response(JSON.stringify({ error: 'Missing target_user_id' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 3. Inicializa o cliente Supabase usando a SERVICE_ROLE_KEY
        // Isso garante que podemos ler a tabela 'user_subscriptions' sem problemas de RLS.
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, // CHAVE DE SERVIÇO!
            { auth: { persistSession: false } }
        );

        // 4. Busca o objeto de subscrição do usuário alvo no banco
        const { data, error } = await supabase
            .from('user_subscriptions')
            .select('subscription_data')
            .eq('user_id', target_user_id)
            .single();

        if (error || !data || !data.subscription_data) {
            console.error('Erro ao buscar subscrição ou subscrição não encontrada:', error || 'No data');
            return new Response(JSON.stringify({ error: 'Subscription not found or database error.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
        }

        const subscription = data.subscription_data;

        // 5. Configura e envia a notificação PUSH
        const VAPID_PUBLIC_KEY = Deno.env.get('PUBLIC_VAPID_KEY')!;
        const VAPID_PRIVATE_KEY = Deno.env.get('PRIVATE_VAPID_KEY')!;
        const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT')!;

        // Verifica se todas as chaves VAPID estão definidas
        if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
            console.error('Missing VAPID secrets!');
            return new Response(JSON.stringify({ error: 'Server configuration error (VAPID keys missing).' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            });
        }

        webpush.setVapidDetails(
            VAPID_SUBJECT,
            VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY
        );

        // O payload enviado para o Service Worker
        const notificationPayload = JSON.stringify({
            title: `Nova Chamada de Vídeo de ${caller_name}!`,
            body: 'Clique aqui para atender a chamada.',
            // URL que será aberta quando o usuário clicar na notificação
            url: `https://the-zap.vercel.app/?target=${target_user_id}`,
        });

        // Envia a notificação Push
        await webpush.sendNotification(subscription as webpush.PushSubscription, notificationPayload);

        console.log('Push Notification sent successfully to user:', target_user_id);

        // 6. Retorno de Sucesso
        return new Response(JSON.stringify({ message: 'Push notification sent.' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        });

    } catch (error) {
        // Tratamento de erros genérico
        console.error('Function error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
    }
});

