import * as React from 'react';

import SignUp from '../../component/SignUp';
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

export default SignUpContainer;
