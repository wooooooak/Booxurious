import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IStoreState } from '../store/modules';
import { actionCreators as userActionCreator } from '../store/modules/User';

import SignUp from '../component/SignUp';
interface IProps {}

interface IState {
  email: string | null;
  password: string | null;
}

class SignUpContainer extends React.Component<IProps, IState> {
  state = {
    email: null,
    password: null
  };

  onSubmitSignUp = () => {
    console.log(this.state);
  };

  onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      email: e.currentTarget.value
    });
  };
  onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.currentTarget.value
    });
  };

  render () {
    console.log(this.props);
    return (
      <div>
        <SignUp
          onSubmitSignUp={this.onSubmitSignUp}
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}
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
