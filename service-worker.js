// =======================================================
// service-worker.js
// Lida com eventos de Push Notification e notificação de clique
// =======================================================

/**
 * Ouve o evento 'push' (disparado pela Edge Function)
 * Converte a carga útil (payload) enviada pelo servidor em JSON e exibe a notificação.
 */
self.addEventListener('push', function(event) {
    // Tenta obter os dados JSON do payload
    const data = event.data.json();
    console.log('[Service Worker] Push recebido com dados:', data);

    // Constrói o título e o corpo da notificação
    const title = data.title || 'Nova Chamada de Vídeo';
    const body = data.body || 'Clique aqui para atender.';
    
    // O 'url' é o link de chamada, ex: https://the-zap.vercel.app/?target=...
    const urlToOpen = data.url; 

    const options = {
        body: body,
        icon: 'icon.png', // Mude para o ícone do seu aplicativo
        badge: 'icon.png', // Ícone pequeno que aparece na barra de status
        vibrate: [100, 50, 100], // Padrão de vibração
        data: {
            url: urlToOpen // Armazena a URL para uso no evento 'notificationclick'
        }
    };

    // Exibe a notificação
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


/**
 * Ouve o evento 'notificationclick' (quando o usuário clica na notificação)
 * Fecha a notificação e abre a URL de chamada armazenada no 'data'.
 */
self.addEventListener('notificationclick', function(event) {
    const notificationData = event.notification.data;
    event.notification.close(); // Fecha a notificação na barra de status

    // Abre a URL de chamada
    const urlToOpen = notificationData.url;
    
    if (urlToOpen) {
        event.waitUntil(
            // Abre o link na janela que está focada ou em uma nova aba
            clients.openWindow(urlToOpen)
        );
    }
});

/**
 * Ouve o evento 'install' e garante que o Service Worker seja ativado imediatamente.
 * Isso não é estritamente necessário para Push, mas é uma boa prática.
 */
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Instalado.');
    event.waitUntil(self.skipWaiting());
});

/**
 * Ouve o evento 'activate' e assume o controle imediatamente
 */
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Ativado.');
    event.waitUntil(self.clients.claim());
});
