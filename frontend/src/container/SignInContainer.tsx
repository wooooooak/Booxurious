import * as React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { IStoreState } from '../store/modules';
import { actionCreators as userActionCreator } from '../store/modules/User';

import SignIn from '../component/SignIn';

interface StoreProps {
  email: string;
  username: string | null;
  goToSignUpPage?: boolean;
}

interface DispatchProps {
  userAction: typeof userActionCreator;
}

type ContainerProps = StoreProps & DispatchProps;

interface IState {
  email: string | null;
  password: string | null;
}

class SignInContainer extends React.Component<ContainerProps, IState> {
  state = {
    email: '',
    password: ''
  };

  onClickSocialLogin = (response: any) => {
    const { userAction } = this.props;
    switch (response.socialProvider) {
      case 'google':
        userAction.socialLoginAsync(
          response.response.profileObj.email,
          response.response.profileObj.imageUrl,
          response.socialProvider
        );
        break;
      case 'kakao':
        console.log(response);
      // userAction.socialLoginAsync(
      //   response.response.profileObj.email,
      //   response.socialProvider
      // );
      default:
        break;
    }
    // 카카오면 다르게 해줘야 할듯
    // 받아오는 response 형태가 다르기 때문.
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

export default connect<StoreProps, DispatchProps>(
  ({ User }: IStoreState): StoreProps => ({
    email: User.email,
    username: User.username,
    goToSignUpPage: User.goToSignUpPage
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(SignInContainer);
