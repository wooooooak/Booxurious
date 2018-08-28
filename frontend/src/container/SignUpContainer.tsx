import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState } from '../store/modules';
import { actionCreators as userActionCreator } from '../store/modules/User';

import SignUp from '../component/SignUp';
import { IUserState } from '../store/modules/User';

type StoreProps = IUserState;
interface DispatchProps {
  userAction: typeof userActionCreator;
}

type ContainerProps = StoreProps & DispatchProps;

interface IState {
  username: string;
}

class SignUpContainer extends React.Component<ContainerProps, IState> {
  state = {
    username: ''
  };

  onSubmitSignUp = () => {
    const { email, socialProvider, profileImg } = this.props;
    const { userAction } = this.props;
    userAction.signUp(this.state.username, email, socialProvider, profileImg);
  };

  onChangeUserName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      username: e.currentTarget.value
    });
  };

  render () {
    if (this.props.code === 422) {
      console.log('username 중복');
    }
    if (this.props.code === 200) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <SignUp
          onSubmitSignUp={this.onSubmitSignUp}
          onChangeUserName={this.onChangeUserName}
        />
      </div>
    );
  }
}

export default connect<StoreProps, DispatchProps>(
  ({ User }: IStoreState) => ({
    email: User.email,
    username: User.username,
    profileImg: User.profileImg,
    code: User.code,
    socialProvider: User.socialProvider
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(SignUpContainer);
