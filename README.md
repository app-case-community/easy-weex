# easy weex
  基于[easywebpack-weex-boilerplate](https://github.com/easy-team/easywebpack-weex-boilerplate)修改，再次减少配置。

## 使用

    安装：
    yarn install
    开发：
    yarn start
    生产：
    yarn build

## 案例

  [easy weex demo](https://github.com/snice/easy-weex-demo)

--- 

## 特性支持

* 增加temp功能（移植weex-toolkit），不用再配置entry入口
* 整理src目录，src/views是页面默认路径
* 页面全局配置，比如web下读取url传参、native设置viewport
* 支持第三方weex组件，默认集成了[weex-ui](https://github.com/alibaba/weex-ui)、[weex-amui](https://github.com/hminghe/weex-amui)、[weex-flymeui](https://github.com/FlymeApps/weex-flymeui)，并支持按需加载

## 配置修改

  configs/config.js
  ```js
  const config = {
    template: 'web/layout.html',
    lib: [helper.rootNode('web/web.js')],
    pageDir: 'src/views', // 页面路径：仅编译这个目录下的vue文件
    templateDir: '.temp', // 将vue文件包装临时js文件的路径
    globalName: 'global' // 页面全局配置, 可读取 ${globalName}.js、${globalName}.${dir}.js
  }
  ```

## 页面全局配置

***规则***
  
1. 文件夹匹配： 
  
    ```js
    ${pageDir}/${dir}/**/*.vue
    ```
    比如：src/views/hhdpi/**/*.vue, 会匹配 ${globalName}.hhdpi.{ js | html }
2. 文件后缀匹配

    ```js
    ${fileName}.${dir}.vue
    ```
    比如：list.hhdpi.vue, 会匹配 ${globalName}.hhdpi.{ js|html }

### weex 

* 默认配置

  ```js
  ${globalName}.js
  ```

* 个性配置

  ```js
  ${globalName}.${dir}.js
  ```

  由于第三方UI库支持的viewport不同，比如weex-ui和weex-amui都是750，weex-flymeui是1080，因此全局配置有可能不同，那么个性配置就派上用场了。

### web

* 默认配置

  ```js
  ${templateName}.js
  ```

* 个性配置

  ```js
  ${templateName}.${dir}.js
  ```

## viewport 配置
* native

  global.js
  ```js
  // 设置viewport
  const meta = weex.requireModule('meta')
  meta.setViewport({
    width: 750
  })
  ```

* web

  web/layout.html

  ```html
  <meta name="weex-viewport" content="750" />
  ```