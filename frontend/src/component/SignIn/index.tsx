import * as React from 'react';
import { PageLayout, ContentBackground, Content, LogoContainer, Text } from './style';
// import styledTS from 'styled-components-ts';
// import { Link } from 'react-router-dom';
// import { FacebookF } from 'styled-icons/fa-brands/FacebookF';
// import { Google } from 'styled-icons/fa-brands/Google';
import { GoogleLogin } from 'react-google-login';
// import KaKaoLogin from 'react-kakao-login';

import Logo from '../Menu/Logo';

interface ISignInProps {
  flashFlag?: boolean;
  onClickSocialLogin(response: any): void;
}

const SignIn: React.SFC<ISignInProps> = ({ onClickSocialLogin }) => (
  <PageLayout>
    {/* <SignInBox /> */}
    <ContentBackground />
    <Content>
      <LogoContainer>
        <Logo fontSize={'30px'} />
      </LogoContainer>
      <GoogleLogin
        clientId="225337963446-i2mah67bkfbgoaeun1mur6u4lefv3us9.apps.googleusercontent.com"
        buttonText="Google Login"
        onSuccess={(response) =>
          onClickSocialLogin({ response, socialProvider: 'google' })}
        onFailure={onClickSocialLogin}
      />
      {/* <KaKaoLogin
        jsKey="c2f6cbb0640301748d24f77404ad204c"
        onSuccess={(response) => {
          onClickSocialLogin({ response, socialProvider: 'kakao' });
        }}
        onFailure={(error) => console.log(error)}
        buttonComponent={<div>KaKao login</div>}
        getProfile={true}
      /> */}
      <Text>기존에 사용하시던 계정으로 쉽게 이용하세요.</Text>
    </Content>
  </PageLayout>
);

export default SignIn;
