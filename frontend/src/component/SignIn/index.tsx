import * as React from "react";
import styled from "styled-components";
import { PageLayout, ContentBackground, Content, LogoContainer, Text, GoogleLoginText, Hr } from "./style";
import { Google } from "styled-icons/fa-brands/Google";
import { GoogleLogin } from "react-google-login";
import KaKaoLogin from "react-kakao-login";

import Logo from "../Menu/Logo";

interface ISignInProps {
  flashFlag?: boolean;
  onClickSocialLogin(response: any): void;
}

const StyledKakaoLogin = styled(KaKaoLogin)`
  display: inline-block;
  padding: 0;
  width: 222px;
  height: 49px;
  line-height: 49px;
  color: #3C1E1E;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
`;

const SignIn: React.SFC<ISignInProps> = ({ onClickSocialLogin }) => (
  <PageLayout>
    <ContentBackground />
    <Content>
      <LogoContainer>
        <Logo fontSize={"35px"} />
        <Hr />
      </LogoContainer>
      <GoogleLogin
        clientId="225337963446-i2mah67bkfbgoaeun1mur6u4lefv3us9.apps.googleusercontent.com"
        onSuccess={(response) => onClickSocialLogin({ response, socialProvider: "google" })}
        onFailure={onClickSocialLogin}
        style={{
          width: "220px",
          background: "#D14836",
          height: "53px",
          border: "none",
          borderRadius: "3px",
          marginBottom: "5px",
          fontSize: "1em",
          cursor: "pointer"
        }}
      >
        <div>
          <Google size={20} style={{ marginBottom: "-3px", marginRight: "5px" }} />
          <GoogleLoginText style={{ fontSize: "1.1em" }}> 구글 계정으로 로그인</GoogleLoginText>
        </div>
      </GoogleLogin>
      <StyledKakaoLogin
        jsKey="ec51e20f327f7c3775270a3bff685e4f"
        onSuccess={(response) => {
          onClickSocialLogin({ response, socialProvider: "kakao" });
        }}
        onFailure={(error) => console.log(error)}
        getProfile={true}
      />
      <Text>기존에 사용하시던 계정으로 쉽게 이용하세요.</Text>
    </Content>
  </PageLayout>
);

export default SignIn;
