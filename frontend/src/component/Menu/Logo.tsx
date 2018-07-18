import * as React from 'react';
import styled from 'styled-components';

interface IProps {}

const LogoContainer = styled.a`
  margin-left: 25px;
  text-decoration: none;
`;

const Text = styled.a`
  color: ${(props) => props.color};
  background-color: transparent;
  font-family: sans-serif;
  border: none;
  text-decoration: none;
  &:visited {
    color: white;
  }
`;

const Logo: React.SFC<IProps> = () => (
  <LogoContainer href="/">
    <Text color="#C5E99B">ele</Text>
    <Text color="white">books</Text>
  </LogoContainer>
);

export default Logo;
