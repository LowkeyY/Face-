
import { parse } from 'qs';
import { config, cookie, setLoginOut, postCurrentPosition } from 'utils';

export default {
  namespace: 'app',
  state: {
    spinning: false,
    showModal: false,
    noViewCount: 0,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {

      history.listen(({ pathname, query, action }) => {
        if (pathname === '/') {

        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {

    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  }
  ,
};
