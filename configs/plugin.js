const path = require('path')
const fs = require('fs-extra');
const config = require('./config')
const helper = require('./helper')
const glob = require('glob');
const isWin = /^win/.test(process.platform);

const templateDir = helper.rootNode(config.templateDir)
let globalFilePath = helper.root(config.globalFilePath);

const getEntryFileContent = (entryPath, vueFilePath) => {
  let globalContents = fs.readFileSync(globalFilePath).toString();
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let contents = '';
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
  }
  contents += `import App from '${relativeVuePath}'\n\n`
  contents += globalContents + '\n'
  contents += 'new Vue(Vue.util.extend({el: \'#root\'}, App));'
  return contents;
}

const getEntryFile = (dir) => {
  dir = dir || config.pageDir;
  let entrys = {}
  const entries = glob.sync(`${dir}/**/*.vue`, {})
  fs.removeSync(templateDir)
  entries.forEach(entry => {
    const extname = path.extname(entry);
    const basename = entry.replace(`${dir}/`, '').replace(extname, '')
    const templatePath = path.join(templateDir, basename + '.js')
    entrys[basename] = templatePath
    fs.outputFileSync(templatePath, getEntryFileContent(templatePath, entry));
  })
  return entrys
}

const buildPlugins = () => {
  const entrys = getEntryFile()
  return {
    entry: entrys,
    template: config.template,
    lib: config.lib
  }
}

module.exports = buildPlugins