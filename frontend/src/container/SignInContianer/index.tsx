import * as React from 'react';

import SignIn from '../../component/SignIn';

interface IProps {}

interface IState {
  email: string | null;
  password: string | null;
}

class SignInContainer extends React.Component<IProps, IState> {
  state = {
    email: null,
    password: null
  };

  onSubmitSignInButton = () => {
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
        <SignIn
          onSubmitSignInButton={this.onSubmitSignInButton}
          onChangeEmail={this.onChangeEmail}
          onChangePassword={this.onChangePassword}
        />
      </div>
    );
  }
}

export default SignInContainer;
