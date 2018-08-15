import * as React from 'react';
// import styled from 'styled-components';

import Logo from '../Menu/Logo';

import {
  PageLayout,
  Content,
  LogoContainer,
  Input,
  ContentBackground
} from '../SignIn/style';
import styled from 'styled-components';

interface ISignUpProps {
  onSubmitSignUp(): void;
  onChangeUserName(e: React.FormEvent<HTMLInputElement>): void;
}

const Text = styled.div`
  color: #58c9b9;
  margin-bottom: 30px;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 30px;
  background-color: #58c9b9;
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignUp: React.SFC<ISignUpProps> = ({ onSubmitSignUp, onChangeUserName }) => (
  <PageLayout>
    <ContentBackground />
    <Content>
      <LogoContainer>
        <Logo fontSize={'30px'} />
      </LogoContainer>
      <Text>elebooks 에서 사용할 닉네임을 입력해주세요.</Text>
      <Input onChange={onChangeUserName} placeholder="display name을 받자" />
      <SubmitButton onClick={onSubmitSignUp}>끄읕!</SubmitButton>
    </Content>
  </PageLayout>
);

export default SignUp;
