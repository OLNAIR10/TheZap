

/* * service-worker.js

 * ----------------------------------------------------

 * Este Service Worker escuta os eventos 'push' e 

 * 'notificationclick' para exibir e gerenciar notificações.

 * Ele deve estar na pasta raiz do seu projeto.

 * ----------------------------------------------------

 */


// Ouve o evento 'push' (quando a Edge Function envia o Push)

self.addEventListener('push', function(event) {

    console.log('[Service Worker] Push recebido.');


    // Converte a carga útil (payload) enviada pela Edge Function

    const data = event.data.json();

    

    const title = data.title || 'Nova Chamada de Vídeo';

    const body = data.body || 'Clique aqui para atender.';

    const url = data.url || '/'; // URL de redirecionamento, caso não venha no payload


    const options = {

        body: body,

        icon: 'icon.png', // Mude para o ícone do seu aplicativo

        badge: 'icon.png', // Badge (em alguns sistemas)

        vibrate: [100, 50, 100], // Vibra o celular

        data: {

            url: url // Anexa o URL ao objeto de dados para uso no click

        }

    };


    // Exibe a notificação

    event.waitUntil(

        self.registration.showNotification(title, options)

    );

});



// Ouve o evento 'notificationclick' (quando o usuário clica na notificação)

self.addEventListener('notificationclick', function(event) {

    console.log('[Service Worker] Notificação clicada.');


    // Fecha a notificação

    event.notification.close();


    // Obtém o URL que deve ser aberto ao clicar

    const urlToOpen = event.notification.data.url;


    // Abre a URL

    event.waitUntil(

        clients.openWindow(urlToOpen)

    );

});



