import * as React from 'react';
// import styled from 'styled-components';

import Logo from '../Menu/Logo';

import {
  PageLayout,
  Content,
  LogoContainer,
  Input,
  ContentBackground,
  Hr
} from '../SignIn/style';
import styled from 'styled-components';

interface ISignUpProps {
  onSubmitSignUp(): void;
  onChangeUserName(e: React.FormEvent<HTMLInputElement>): void;
}

const Text = styled.div`
  color: black;
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 10px;
  margin-top: -30px;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 30px;
  background-color: #ffbc42;
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
        <Hr />
      </LogoContainer>
      <Text>
        booxurious 에서 사용할 닉네임을 입력해주세요.<br /> 닉네임은 언제든 변경할 수 있습니다.
      </Text>
      <Input onChange={onChangeUserName} placeholder="여기에 입력하세요!" />
      <SubmitButton onClick={onSubmitSignUp}>끄읕!</SubmitButton>
    </Content>
  </PageLayout>
);

export default SignUp;
