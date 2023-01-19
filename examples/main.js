import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ColorSelection from "../packages";

createApp(App).use(ColorSelection).mount("#app");
