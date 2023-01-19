<template>
  <div class="df-slider">
    <div
      class="df-slider-color"
      :style="{ background: sliderBg }"
      id="df-slider-color-id"
    >
      <div
        class="color-drag"
        :style="{ left: pLeft, color: '#f00' }"
        @mousedown="handleMouseDown"
      >
        {{ pLeft }}
      </div>
    </div>
    <div class="df-slider-alpha"></div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
// linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
const colorList = [
  {
    color: "#f00",
    percent: 0,
  },
  {
    color: "#ff0",
    percent: 17,
  },
  {
    color: "#0f0",
    percent: 33,
  },
  {
    color: "#0ff",
    percent: 50,
  },
  {
    color: "#00f",
    percent: 67,
  },
  {
    color: "#f0f",
    percent: 83,
  },
  {
    color: "#f00",
    percent: 100,
  },
];

const sliderBg = computed(() => {
  let colorStr = "";
  colorList.forEach((color, index) => {
    colorStr =
      colorStr +
      `${color.color} ${color.percent}% ${
        index == colorList.length - 1 ? "" : ","
      }`;
  });
  console.log(colorStr, `linear-gradient(90deg, ${colorStr})`);
  return `linear-gradient(90deg, ${colorStr})`;
});

function onCanvasMousedown(ev, type) {
  var self = this;
  var ePos = {
    x: ev.layerX || ev.offsetX,
    y: ev.layerY || ev.offsetY,
  };
  var offsetTop = parseInt(ev.target.offsetTop);
  var offsetLeft = parseInt(ev.target.offsetLeft);
  if (
    type === "cur" ||
    (ePos.x >= 30 &&
      ePos.x < 30 + this.width &&
      ePos.y >= 0 &&
      ePos.y < this.height)
  ) {
    var cur = document.getElementById(this.curId);
    document.onmouseup = function () {
      document.onmouseup = document.onmousemove = null;
    };
    document.onmousemove = function (e) {
      try {
        var pos = {
          x: e.clientX - ev.clientX + ev.offsetX + offsetLeft,
          y: e.clientY - ev.clientY + ev.offsetY + offsetTop,
        };

        pos.x =
          pos.x <= 30
            ? 30
            : pos.x && (pos.x > self.width - 1 ? self.width - 1 : pos.x);
        pos.y =
          pos.y <= 0
            ? 0
            : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos.y);

        var rgbaStr = self.getRgbaAtPoint(pos, "box");
        self.setCurColor(rgbaStr);
        cur.style.left = pos.x + "px";
        cur.style.top = pos.y + "px";
      } catch (e) {
        console.log(e);
      }
    };
  } else if (ePos.x <= 20 && ePos.y <= this.height) {
    var bar = document.getElementById(this.barId);
    document.onmouseup = function () {
      document.onmouseup = document.onmousemove = null;
    };
    document.onmousemove = function (e) {
      try {
        var pos = {
          x: 0,
          y: e.clientY - ev.clientY + ev.offsetY + offsetTop,
        };

        pos.y =
          pos.y <= 0
            ? 0
            : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos.y);

        var rgbaStr = self.getRgbaAtPoint(pos, "box");
        bar.style.top = pos.y + "px";
        self.activeColor = self.rgb2hex(
          "rgb(" + rgbaStr.slice(0, 3).join() + ")"
        );
        self.makeColorBox("rgb(" + rgbaStr.slice(0, 3).join() + ")");
        self.$emit("active-change", self.activeColor);
      } catch (e) {
        console.log(e);
      }
    };
  }
}

function handleMouseDown(el) {
  console.log(el);
  const element = document.getElementById("df-slider-color-id");
  console.log(element, "handleMouseMove");
  element.onmousemove = handleMouseMove;
}
const x = ref(0);
const pLeft = computed(() => {
  console.log(`left: ${x.value}px`, "555555555555");
  return `${x.value}px`;
});
function handleMouseMove(el) {
  // console.log(el);
  console.log(el.layerX, el, "4444444444");
  x.value = el.layerX;
}
</script>

<style lang="scss">
.df-slider {
  .df-slider-color {
    height: 20px;
    position: relative;
    .color-drag {
      position: absolute;
      top: 0;
      // left: 0;
      width: 20px;
      height: 20px;
      background: #fff;
      cursor: pointer;
    }
  }
}
</style>