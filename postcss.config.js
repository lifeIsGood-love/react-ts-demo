module.exports = () => ({
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("postcss-preset-env")({
      autoprefixer: {
        browsers: [
          ">1%",
          "last 7 versions",
          "not ie < 9", // React doesn't support IE8 anyway
          "iOS >= 8",
          "Android > 4.0",
        ],
        flexbox: "no-2009",
        // remove: false // 关闭 autoprefixer自动移除老式过时的代码
      },
      stage: 3,
    }),
    require("postcss-aspect-ratio-mini"),
    require("postcss-write-svg")({
      utf8: false, // 兼容1px问题， 必须在postcss-px-to-viewport前面
    }),
    require("postcss-px-to-viewport")({
      viewportWidth: 750, // 视窗的宽度
      viewportHeight: 1334, // 视窗的高度
      unitPrecision: 5, // 指定px转换为视窗单位值的小数位数
      viewportUnit: "vw", // 指定需要转换的视窗单位
      selectorBlackList: [".ignore", ".hairlines"], // 指定不转换为视窗点位的类，可自定义
      mediaQuery: true, // 允许在媒体查询中使用视窗单位
      minPixelValue: 1, // 小于或等于1px不转换为视窗单位
    }),
    require("postcss-normalize"),
  ],
});
