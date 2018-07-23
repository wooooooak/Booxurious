import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { Link } from 'react-router-dom';
import { FacebookF } from 'styled-icons/fa-brands/FacebookF';
import { Google } from 'styled-icons/fa-brands/Google';

import Logo from '../Menu/Logo';

interface ISignInProps {
  onSubmitSignInButton(): void;
  onChangeEmail(e: React.FormEvent<HTMLInputElement>): void;
  onChangePassword(e: React.FormEvent<HTMLInputElement>): void;
}

export const PageLayout = styled.div`
  background-image: url('https://cdn.pixabay.com/photo/2018/01/30/22/50/forest-3119826_960_720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  z-index: 2;
  top: 40%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
  background-color: #2c3a47;
  border-radius: 15px;
  margin-bottom: 10px;
  outline: none;
  border-color: transparent;
`;
export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #cad3c8;
`;

interface ISocialLoginButton {
  backgroundColor: string;
}

const SocialLoginButton = styledTS<ISocialLoginButton>(styled.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border-radius: 15px;
  margin-bottom: 7px;
  cursor: pointer;
`;

const FacebookIcon = FacebookF.extend`
  display: flex;
  justify-self: flex-start;
`;

const SignIn: React.SFC<ISignInProps> = ({
  onSubmitSignInButton,
  onChangeEmail,
  onChangePassword
}) => (
  <PageLayout>
    {/* <SignInBox /> */}
    <Content>
      <LogoContainer>
        <Logo fontSize={'30px'} />
      </LogoContainer>
      <Input onChange={onChangeEmail} />
      <Input onChange={onChangePassword} />
      <SubmitButton onClick={onSubmitSignInButton}>Login!</SubmitButton>
      <Link to="/signUp"> 회원가입</Link>
      <SocialLoginButton backgroundColor="#3b5999">
        <FacebookIcon size={30} />
        <p> facebook login</p>
      </SocialLoginButton>
      <SocialLoginButton backgroundColor="#CB4023">
        <Google size={25} />
        <p> google login</p>
      </SocialLoginButton>
    </Content>
  </PageLayout>
);

export default SignIn;
