import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import MenuContainer from './container/MenuContainer';
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
          <Route exact={true} to="/" component={IntroOne} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
