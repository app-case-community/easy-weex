const path = require('path')
const fs = require('fs-extra')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {
  getGlobalCode,
  getTemplateCode
} = require('./global')
const config = require('./config')
const helper = require('./helper')
const glob = require('glob')
const isWin = /^win/.test(process.platform)

const templateDir = helper.rootNode(config.templateDir)

const getSingleEntryFileContent = (entryFile, relativeVuePath, vueParser) => {
  let content = fs.readFileSync(entryFile).toString()
  // TODO: 还需要替换更多相对路径
  let rootPath = relativeVuePath.replace(vueParser.base, '')
  let reg = new RegExp('\'./', 'g')
  content = content.replace(reg, '\'' + rootPath) // 替换 './ -> 和vue文件同级目录
  return content
}

const getEntryFileContent = (entryPath, vueFilePath) => {
  // *.vue 相对地址
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath)
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\')
  }
  // 单vue 入口配置
  const vueParser = path.parse(helper.rootNode(vueFilePath))
  const parentPath = vueParser.dir
  const entryFile = path.resolve(parentPath, 'entry.js')
  if (fs.existsSync(entryFile)) {
    return getSingleEntryFileContent(entryFile, relativeVuePath, vueParser)
  }
  // 拼接index.js 内容
  let contents = `import App from '${relativeVuePath}'\n\n`
  // 插入global代码
  const globalContents = getGlobalCode(vueFilePath)
  if (globalContents) {
    contents += globalContents + '\n'
  }
  // 导出new Vue
  contents += 'export default new Vue(Vue.util.extend({el: \'#root\'}, App));'
  return contents
}

const getTemplateContent = vueFilePath => {
  return getTemplateCode(vueFilePath)
}

const getEntryFile = dir => {
  dir = dir || config.pageDir
  let entrys = {}
  const entries = glob.sync(`${dir}/**/*.vue`, {})
  fs.removeSync(templateDir)
  entries.forEach(entry => {
    const extname = path.extname(entry)
    const basename = entry.replace(`${dir}/`, '').replace(extname, '')
    const templateJsPath = path.join(templateDir, basename + '.js')
    const templateHtmlPath = path.join(templateDir, basename + '.html')
    entrys[basename] = templateJsPath
    fs.outputFileSync(
      templateJsPath,
      getEntryFileContent(templateJsPath, entry)
    )
    fs.outputFileSync(templateHtmlPath, getTemplateContent(entry))
  })
  return entrys
}

const loaders = {
  weex: {
    exclude: []
  },
  vue: {
    exclude: []
  },
  babel: {
    exclude: []
  }
}

const plugins = [{
  uglifyJs: false
}]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    parallel: 4,
    uglifyOptions: {
      ie8: false,
      ecma: 5,
      warnings: false,
      compress: true,
      mangle: {
        safari10: true
      },
      output: {
        comments: false
      }
    }
  }))
  // new UglifyJsPlugin({
  //   // 使用外部引入的新版本的js压缩工具
  //   parallel: 4,
  //   uglifyOptions: {
  //     ie8: false,
  //     ecma: 6,
  //     warnings: false,
  //     mangle: true, // debug false
  //     output: {
  //       comments: false,
  //       beautify: false // debug true
  //     },
  //     compress: {
  //       // 在UglifyJs删除没有用到的代码时不输出警告
  //       warnings: false,
  //       // 删除所有的 `console` 语句
  //       // 还可以兼容ie浏览器
  //       drop_console: true,
  //       // 内嵌定义了但是只用到一次的变量
  //       collapse_vars: true,
  //       // 提取出出现多次但是没有定义成变量去引用的静态值
  //       reduce_vars: true
  //     }
  //   }
  // })
}

const buildPlugins = () => {
  const entrys = getEntryFile()
  return {
    entry: entrys,
    template: config.template,
    lib: config.lib,
    loaders,
    plugins
  }
}

module.exports = buildPlugins
