self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data.json();
  } catch {}

  self.registration.showNotification(data.title || "Notificação", {
    body: data.body || "Você recebeu uma mensagem",
    icon: "/icon.png"
  });
});
