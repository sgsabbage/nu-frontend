import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";

if ("nu" in window) {
  console.log("Nu client app detected");
  const notification = function (title: string, options?: NotificationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.nu.sendNotification(title, options);
  };
  notification.permission = window.Notification.permission;
  notification.requestPermission = window.Notification.requestPermission;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Notification = notification;
}

if (Notification.permission === "default") {
  Notification.requestPermission();
}

createApp(App).use(router).mount("#app");
