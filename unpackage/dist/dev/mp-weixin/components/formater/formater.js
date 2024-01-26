"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "formater",
  props: {
    timestamp: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: "MM-dd hh:mm:ss"
    }
  },
  setup(__props) {
    const props = __props;
    const formater = common_vendor.ref("");
    common_vendor.onMounted(() => {
      formater.value = TIME_FORMAT(props.timestamp, props.format);
    });
    const TIME_FORMAT = (t, fmt) => {
      const newDate = new Date();
      newDate.setTime(t);
      return newDate.VP_FORMAT(fmt);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(formater.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/HBuilderProjects/uni-project/components/formater/formater.vue"]]);
wx.createComponent(Component);
