"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    // 背景色
    background: {
      type: String,
      default: "#ffffff"
    },
    // 颜色
    color: {
      type: String,
      default: "#000000"
    },
    // 文字大小
    fontSize: {
      type: String,
      default: 32
    },
    // 图标宽度
    iconWidth: {
      type: String,
      default: 116
    },
    // 图标高度
    iconHeight: {
      type: String,
      default: 38
    },
    // 文字标题
    titleText: {
      type: String,
      default: ""
    },
    // 是否为首页
    isHome: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.onBeforeMount(() => {
      setNavSize(), setStyle();
    });
    const status = common_vendor.ref(0);
    const navHeight = common_vendor.ref(0);
    const containerStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const pages = common_vendor.ref(getCurrentPages().length);
    const menu = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    const setNavSize = () => {
      const { system, statusBarHeight } = common_vendor.index.getSystemInfoSync();
      status.value = statusBarHeight * 2;
      const isIos = system.indexOf("ios") > -1;
      if (!isIos) {
        navHeight.value = 96;
      } else {
        navHeight.value = 88;
      }
    };
    const setStyle = () => {
      containerStyle.value = ["background:" + props.background].join(";");
      textStyle.value = ["color:" + props.color, "font-size:" + props.fontSize + "rpx"].join(";");
      iconStyle.value = ["weight" + props.iconWidth + "rpx", "height:" + props.iconHeight + "rpx"].join(";");
    };
    const backOrHome = () => {
      if (pages.value > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + status.value + "rpx;" + containerStyle.value),
        b: __props.isHome
      }, __props.isHome ? {
        c: common_vendor.s("height:" + menu.height * 2 + "rpx;line-height:" + menu.height * 2 + "rpx;margin-top:" + (menu.top * 2 - status.value) + "rpx;margin-left:32rpx;margin-right:" + (menu.width * 2 + 24) + "rpx;background:#f4f4f4;border-radius:200rpx;text-align:center"),
        d: common_vendor.s("height:" + navHeight.value + "rpx;line-height:" + navHeight.value + "rpx;padding-left:20rpx;")
      } : common_vendor.e({
        e: pages.value > 1
      }, pages.value > 1 ? {} : {}, {
        f: common_vendor.o(backOrHome),
        g: __props.titleText
      }, __props.titleText ? {
        h: common_vendor.t(__props.titleText),
        i: common_vendor.s("height:" + navHeight.value + "rpx;line-height:" + navHeight.value + "rpx;" + textStyle.value)
      } : {}, {
        j: common_vendor.s("height:" + navHeight.value + "rpx;" + containerStyle.value)
      }));
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/HBuilderProjects/uni-project/components/navbar/navbar.vue"]]);
wx.createComponent(Component);
