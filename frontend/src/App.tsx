import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import MenuContainer from './container/MenuContainer';
import SignUpContianer from './container/SignUpContianer';
import IntroOne from './component/Main/IntroOne';

injectGlobal`
  body {
    margin: 0;
  }
`;

interface IProps {}

interface IState {}

class App extends React.Component<IProps, IState> {
  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuContainer />
          <Switch>
            <Route exact={true} path="/" component={IntroOne} />
            <Route exact={true} path="/signup" component={SignUpContianer} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
