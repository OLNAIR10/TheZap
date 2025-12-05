self.addEventListener("push", function (event) {
  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "Nova mensagem", body: "Você recebeu algo!" };
  }

  const options = {
    body: data.body,
    icon: data.icon || "/icon.png",
    badge: "/icon.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Notificação", options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // abre seu app ao tocar na notificação
  );
});
