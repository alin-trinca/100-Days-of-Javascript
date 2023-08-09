const button = document.getElementById("button");
const toasts = document.getElementById("toasts");

const notifications = [
  { message: "Amazing, it worked!", type: "success" },
  { message: "This can't be good!", type: "error" },
  { message: "Wow, slow down!", type: "warning" },
  { message: "Just an FYI", type: "info" }
];

button.addEventListener("click", () => createNotification());

function createNotification(messageTypeObj = getRandomNotification()) {
  const notif = document.createElement("div");
  notif.classList.add("toast", messageTypeObj.type);
  notif.innerText = messageTypeObj.message;

  toasts.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

function getRandomNotification() {
  return notifications[Math.floor(Math.random() * notifications.length)];
}
