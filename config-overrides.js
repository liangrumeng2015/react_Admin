const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 实现按需打包
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   // 主题颜色，详见：https://ant.design/docs/react/customize-theme-cn
   addLessLoader({
     javascriptEnabled: true,
     modifyVars: { '@primary-color': '#1DA57A' },
   })
);