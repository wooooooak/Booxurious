import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CssTs from 'styled-components-ts';

interface IProps {
	fontSize?: string;
	marginleft?: string;
}

interface ILogoContainer {
	marginleft?: string;
	to: string;
}

const LogoContainer = CssTs<ILogoContainer>(styled(Link))`
  margin-left: ${(props) => (props.marginleft ? props.marginleft : '0px;')}
  // text-decoration: underline;
`;

const Text = styled.text`
	color: ${(props) => props.color};
	background-color: transparent;
	font-family: sans-serif;
	/* border: none; */
	font-size: ${(props) => props.fontSize};
	&:visited {
		color: white;
	}
`;

const Logo: React.SFC<IProps> = ({ fontSize, marginleft }) => (
	<LogoContainer to="/" marginleft={marginleft}>
		<Text color="#FFBC42" fontSize={fontSize}>
			boo
		</Text>
		<Text color="#1F2124" fontSize={fontSize}>
			xurious
		</Text>
	</LogoContainer>
);

export default Logo;
