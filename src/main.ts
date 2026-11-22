import { createApp } from "vue";
import { ElButton, ElMessage, ElRow } from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";

if (import.meta.env.MODE !== "demo") {
  void import("@chankay/site-shell/tokens.css");
}

const app = createApp(App);
app.component(ElButton.name, ElButton);
app.component(ElRow.name, ElRow);
app.component(ElMessage.name, ElMessage);
app.mount("#app");
