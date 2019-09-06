/* eslint-disable one-var */
import modelExtend from 'dva-model-extend';

const model = {
    reducers: {
      updateState (state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
  },
  pageModel = modelExtend(model, {});
module.exports = {
  model,
  pageModel,
};
