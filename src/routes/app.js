
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Loader, TabBar, Icon, Modal } from 'components';
import './app.less';

const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.endsWith('/index.html') ? '/' : pathname; // Android配置首页自启动
  
  cnSetStatusBarStyle(pathname);

  return (
    <div className="tabbarbox">
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  icon: PropTypes.string
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
