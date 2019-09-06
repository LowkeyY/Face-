import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'

export default modelExtend(model, {
  namespace: 'result',

  state: {

  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/result' || pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          datas: [],
        },
      })
    },
  },
})
