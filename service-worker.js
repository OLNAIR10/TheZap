// service-worker.js

// Ouve o evento 'push' (quando a Edge Function envia a notificação)
self.addEventListener('push', function(event) {
  // Converte a carga útil (payload) enviada pela Edge Function
  const data = event.data.json(); 
  const title = data.title || 'Nova Chamada de Vídeo';
  const body = data.body || 'Clique aqui para atender.';
  
  const options = {
    body: body,
    icon: '/icon.png', // Mude para o ícone do seu app
    badge: '/icon.png',
    vibrate: [100, 50, 100], // Vibra o celular
    data: {
      url: data.url // URL para onde o usuário será redirecionado ao clicar
    }
  };

  // Exibe a notificação
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Ouve o evento 'notificationclick' (quando o usuário clica na notificação)
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const urlToOpen = event.notification.data.url;
  // Abre a URL da chamada
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});
