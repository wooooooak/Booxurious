import * as React from 'react';
// import styled from 'styled-components';

import Logo from '../Menu/Logo';

import { PageLayout, Content, LogoContainer, Input, SubmitButton } from '../SignIn';

interface ISignUpProps {
  onSubmitSignUp(): void;
  onChangeEmail(e: React.FormEvent<HTMLInputElement>): void;
  onChangePassword(e: React.FormEvent<HTMLInputElement>): void;
}

const SignUp: React.SFC<ISignUpProps> = ({
  onSubmitSignUp,
  onChangeEmail,
  onChangePassword
}) => (
  <PageLayout>
    <Content>
      <LogoContainer>
        <Logo fontSize={'30px'} />
      </LogoContainer>
      <Input onChange={onChangeEmail} />
      <Input onChange={onChangePassword} />
      <SubmitButton onClick={onSubmitSignUp}>submit!</SubmitButton>
    </Content>
  </PageLayout>
);

export default SignUp;
