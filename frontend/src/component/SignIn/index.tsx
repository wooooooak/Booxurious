import * as React from 'react';
import {
  PageLayout,
  ContentBackground,
  Content,
  LogoContainer,
  Text,
  GoogleLoginText,
  Hr
} from './style';
import { Google } from 'styled-icons/fa-brands/Google';
import { GoogleLogin } from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import kakaoImage from './kakaoImage.png';

import Logo from '../Menu/Logo';

interface ISignInProps {
  flashFlag?: boolean;
  onClickSocialLogin(response: any): void;
}

const LoginButton: React.SFC<{}> = () => (
  <img style={{ cursor: 'pointer' }} src={kakaoImage} />
);

const SignIn: React.SFC<ISignInProps> = ({ onClickSocialLogin }) => (
  <PageLayout>
    <ContentBackground />
    <Content>
      <LogoContainer>
        <Logo fontSize={'35px'} />
        <Hr />
      </LogoContainer>
      <GoogleLogin
        clientId="225337963446-i2mah67bkfbgoaeun1mur6u4lefv3us9.apps.googleusercontent.com"
        onSuccess={(response) =>
          onClickSocialLogin({ response, socialProvider: 'google' })}
        onFailure={onClickSocialLogin}
        style={{
          width: '220px',
          background: '#D14836',
          height: '53px',
          border: 'none',
          borderRadius: '3px',
          marginBottom: '5px',
          fontSize: '1em',
          cursor: 'pointer'
        }}
      >
        <div>
          <Google size={20} style={{ marginBottom: '-3px', marginRight: '5px' }} />
          <GoogleLoginText style={{ fontSize: '1.1em' }}> 구글 계정으로 로그인</GoogleLoginText>
        </div>
      </GoogleLogin>
      <KaKaoLogin
        jsKey="ec51e20f327f7c3775270a3bff685e4f"
        onSuccess={(response) => {
          onClickSocialLogin({ response, socialProvider: 'kakao' });
        }}
        onFailure={(error) => console.log(error)}
        buttonComponent={<LoginButton />}
        getProfile={true}
      />
      <Text>기존에 사용하시던 계정으로 쉽게 이용하세요.</Text>
    </Content>
  </PageLayout>
);

export default SignIn;
