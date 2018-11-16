/**
 * Created by Tommy on 2018/5/23 .
 * */
const globalEvent = weex.requireModule('globalEvent')
export default {
  created () {
    globalEvent.addEventListener('receiveMsgFromWeb', ({method, params}) => {
      this[method](params)
    })
  },
  destroyed () {
    /// 注意:必须remove
    globalEvent.removeEventListener('receiveMsgFromWeb')
  }
}
