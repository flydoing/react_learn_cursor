module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      viewportUnit: 'vw', // 希望使用的视口单位
      selectorBlackList: ['.ignore', '.hairlines'], // 需要忽略的CSS选择器
      minPixelValue: 1, // 最小的转换数值
      mediaQuery: false, // 是否在媒体查询中也转换px
      exclude: [/node_modules/], // 排除 node_modules 文件夹
    },
  },
}; 