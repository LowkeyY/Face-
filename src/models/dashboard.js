import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { routerRedux } from 'dva/router'
import { Modal } from '../components'
import { matchPhoto } from '../services/app'

const dateFtt = (fmt, date) => { //author: meizz
  const o = {
    'M+': date.getMonth() + 1,     //月份
    'd+': date.getDate(),     //日
    'h+': date.getHours(),     //小时
    'm+': date.getMinutes(),     //分
    's+': date.getSeconds(),     //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds(),    //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    userInfo: {},
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const history = JSON.parse(localStorage.getItem('history')) || []
      const { error_msg = '', result = {} } = yield call(matchPhoto, payload)
      if (error_msg === 'SUCCESS') {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: {
              userId: result.user_list[0].user_id,
              similarity: result.user_list[0].score,
              ...JSON.parse(result.user_list[0].user_info),
            },
          },
        })
        const res = {
          userId: result.user_list[0].user_id,
          similarity: result.user_list[0].score,
          uploadDate: dateFtt('yyyy-MM-dd hh:mm:ss', new Date()),
          ...JSON.parse(result.user_list[0].user_info),
        }
        if (history.length === 0) {
          localStorage.setItem('history', JSON.stringify([res]))
        } else {
          localStorage.setItem('history', JSON.stringify([res, ...history]))
        }
        yield put(routerRedux.push({
          pathname: '/result',
          query: {
            index: 0,
          },
        }))
      } else {
        Modal.alert('', error_msg, [{
          text: '知道了',
          onPress: () => {
          },
        }])
        // Toast.fail(error_msg)
      }
    },
  },
})
