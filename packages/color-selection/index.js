// filename: packages/slider/index.ts
import ColorSelection from "./src/index.vue";
ColorSelection.install = function (Vue) {
  Vue.component(ColorSelection.name, ColorSelection);
};
export default ColorSelection;
