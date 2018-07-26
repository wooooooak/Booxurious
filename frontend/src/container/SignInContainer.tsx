import * as React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { IStoreState } from '../store/modules';
import { actionCreators as userActionCreator } from '../store/modules/User';

import SignIn from '../component/SignIn';

interface IProps {
  userAction: typeof userActionCreator;
  email: string;
  username: string;
  goToSignUpPage?: boolean;
}

interface IState {
  email: string | null;
  password: string | null;
}

class SignInContainer extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: ''
  };

  onClickSocialLogin = (response: any) => {
    const { userAction } = this.props;
    userAction.socialLoginAsync(response.profileObj.email);
  };

  render () {
    const { goToSignUpPage } = this.props;
    if (localStorage.token !== undefined) {
      return <Redirect to="/" />;
    }
    if (goToSignUpPage) {
      return <Redirect to="/signUp" />;
    }
    return <SignIn onClickSocialLogin={this.onClickSocialLogin} />;
  }
}

export default connect(
  ({ User }: IStoreState) => ({
    email: User.email,
    username: User.username,
    message: User.message,
    goToSignUpPage: User.goToSignUpPage
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(SignInContainer);
