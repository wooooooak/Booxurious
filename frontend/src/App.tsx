import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IStoreState } from './store/modules';
import { actionCreators as userActionCreator } from './store/modules/User';

import IntroOne from './component/Main/IntroOne';

// container
import MenuContainer from './container/MenuContainer';
import SignInContianer from './container/SignInContainer';
import SignUpContainer from './container/SignUpContainer';

injectGlobal`
  body {
    margin: 0;
      *:focus {
        outline: none;
      }
  }
`;

interface IProps {
  userAction: typeof userActionCreator;
  email: string;
  username: string;
}

interface IState {}

class App extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    if (localStorage.token !== null) {
      console.log(localStorage.token);
      console.log(this.props);
      const { userAction } = this.props;
      // 토큰값을 이용해서 서버로부터 유저 정보를 불러오자
      userAction.fetchUserData(localStorage.token);
    }
  }

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

export default connect(
  ({ User }: IStoreState) => ({
    email: User.email,
    username: User.username
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(App);
