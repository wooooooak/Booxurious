import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CssTs from 'styled-components-ts';

interface IProps {
  fontSize?: string;
  marginLeft?: string;
}

interface ILogoContainer {
  marginLeft?: string;
  to: string;
}

const LogoContainer = CssTs<ILogoContainer>(styled(Link))`
  text-decoration: none;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px;')}
`;

const Text = styled.text`
  color: ${(props) => props.color};
  background-color: transparent;
  font-family: sans-serif;
  border: none;
  text-decoration: none;
  font-size: ${(props) => props.fontSize};
  &:visited {
    color: white;
  }
`;

const Logo: React.SFC<IProps> = ({ fontSize, marginLeft }) => (
  <LogoContainer to="/" marginLeft={marginLeft}>
    <Text color="#FFBC42" fontSize={fontSize}>
      boo
    </Text>
    <Text color="#1F2124" fontSize={fontSize}>
      xurious
    </Text>
  </LogoContainer>
);

export default Logo;
