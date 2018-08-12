import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

interface IProps {
  socialProvider: string | undefined;
  onLogoutSuccess(): void;
}

interface LogoutButtonProps {
  onClick(): void;
}

export const Button = styledTS<LogoutButtonProps>(styled.button)`
  margin-top: 200px;
  width: 50px;
`;

const LogoutButton: React.SFC<IProps> = ({ socialProvider, onLogoutSuccess }) => (
  <Button onClick={onLogoutSuccess}>logout</Button>
);

export default LogoutButton;
