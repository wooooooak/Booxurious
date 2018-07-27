import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
// import { Link } from 'react-router-dom';
import { FacebookF } from 'styled-icons/fa-brands/FacebookF';
import { Google } from 'styled-icons/fa-brands/Google';
import { GoogleLogin } from 'react-google-login';

import Logo from '../Menu/Logo';

interface ISignInProps {
  flashFlag?: boolean;
  onClickSocialLogin(response: any): void;
}

export const PageLayout = styled.div`
  background-image: url("https://s3.ap-northeast-2.amazonaws.com/elebooks/img/main.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

export const ContentBackground = styled.div`
  position: fixed;
  opacity: 0.9;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  background-color: #1f2124;
  border-radius: 20px;
  height: 400px;
  width: 400px;
  padding: 20px 50px;
`;

export const Content = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  height: 400px;
  padding: 50px 50px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  background-size: auto;
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 15px;
  background-color: #2c3a47;
  border-radius: 15px;
  margin-bottom: 10px;
  outline: none;
  font-size: 1.2rem;
  color: white;
  border-color: transparent;
`;
export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
  margin-top: 20px;
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

// const SteyldLink = styled(Link)`
//   color: white;
// `;

const Text = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 1.1rem;
  color: #fffff3;
`;

const SignIn: React.SFC<ISignInProps> = ({ onClickSocialLogin }) => (
  <PageLayout>
    {/* <SignInBox /> */}
    <ContentBackground />
    <Content>
      <LogoContainer>
        <Logo fontSize={'30px'} />
      </LogoContainer>
      {/* <SteyldLink to="/signUp">회원가입</SteyldLink> */}
      <SocialLoginButton backgroundColor="#3b5999">
        <FacebookIcon size={30} />
        <p> facebook login</p>
      </SocialLoginButton>
      <SocialLoginButton backgroundColor="#CB4023">
        <Google size={25} />
        <p> google login</p>
      </SocialLoginButton>
      <GoogleLogin
        clientId="824329025824-9qvtl43o44nj9l34pdp31qg0uu903qh6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response) =>
          onClickSocialLogin({ response, socialProvider: 'google' })}
        onFailure={onClickSocialLogin}
      />
      {/* <FacebookLogin
        clientId="824329025824-9qvtl43o44nj9l34pdp31qg0uu903qh6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response) => onClickSocialLogin({ response, provider: 'facebook' })}
        onFailure={onClickSocialLogin}
      /> */}
      <Text>기존에 사용하시던 계정으로 쉽게 이용하세요.</Text>
    </Content>
  </PageLayout>
);

export default SignIn;
