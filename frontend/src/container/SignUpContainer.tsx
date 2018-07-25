import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IStoreState } from '../store/modules';
import { actionCreators as userActionCreator } from '../store/modules/User';

import SignUp from '../component/SignUp';
interface IProps {
  email: string;
  userAction: typeof userActionCreator;
}

interface IState {
  username: string;
}

class SignUpContainer extends React.Component<IProps, IState> {
  state = {
    username: ''
  };

  onSubmitSignUp = () => {
    const { email } = this.props;
    console.log(email);
    console.log(this.state);
    const { userAction } = this.props;
    userAction.signUp(this.state.username, email);
  };

  onChangeUserName = (e: React.FormEvent<HTMLInputElement>): void => {
    console.log(this.state.username);
    this.setState({
      username: e.currentTarget.value
    });
  };

  render () {
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

export default connect(
  ({ User }: IStoreState) => ({
    email: User.email
  }),
  (dispatch) => ({
    userAction: bindActionCreators(userActionCreator, dispatch)
  })
)(SignUpContainer);
