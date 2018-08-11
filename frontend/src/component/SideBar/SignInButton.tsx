import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  margin-top: 200px;
  width: 50px;
  text-decoration: none;
  color: black;
`;

const SignInButton: React.SFC<{}> = () => {
  return <Button to="signIn">로그인</Button>;
};

export default SignInButton;
