import * as React from "react";
import styled from "styled-components";

import MenuContainer from "../container/MenuContainer";
import SignInContainer from "../container/SignInContainer";

export const Div = styled.div`
  background: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-image/book-wall-1151405_1920.jpg');
  background-position: center;
  background-size: cover;
`;

const SignInPage: React.SFC<{}> = () => {
  return (
    <Div>
      <MenuContainer />
      <SignInContainer />
    </Div>
  );
};

export default SignInPage;
