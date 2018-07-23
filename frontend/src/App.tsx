import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import IntroOne from './component/Main/IntroOne';

// container
import MenuContainer from './container/MenuContainer';
import SignInContianer from './container/SignInContianer';
import SignUpContainer from './container/SignUpContainer';

injectGlobal`
  body {
    margin: 0;
      *:focus {
        outline: none;
      }
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
            <Route exact={true} path="/signIn" component={SignInContianer} />
            <Route exact={true} path="/signUp" component={SignUpContainer} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
