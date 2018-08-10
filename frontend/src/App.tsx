import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IStoreState } from './store/modules';
import { actionCreators as userActionCreator } from './store/modules/User';

// import IntroContainer from './container/IntroContainer';
import IntroPage from './pages/introPage';

// container
import MenuContainer from './container/MenuContainer';
import SignInContianer from './container/SignInContainer';
import SignUpContainer from './container/SignUpContainer';

injectGlobal`
  body {
    margin: 0;
    background-color: #f2f5f7
      *:focus {
        outline: none;
      }
  }
`;

interface StateProps {
  email: string;
  username: string | null;
}

interface DispatchProps {
  userAction: typeof userActionCreator;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface IState {}

class App extends React.Component<Props, IState> {
  constructor (props: Props) {
    super(props);
    if (localStorage.token !== undefined) {
      const { userAction } = this.props;
      userAction.fetchUserData(localStorage.token);
    }
  }

  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuContainer />
          <Switch>
            <Route exact={true} path="/" component={IntroPage} />
            <Route exact={true} path="/signIn" component={SignInContianer} />
            <Route exact={true} path="/signUp" component={SignUpContainer} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  ({ User }: IStoreState): StateProps => ({
    email: User.email,
    username: User.username
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(App);
