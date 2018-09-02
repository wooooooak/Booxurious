import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

interface IProps {
  onLogoutSuccess(): void;
}

interface LogoutButtonProps {
  onClick(): void;
}

export const Button = styledTS<LogoutButtonProps>(styled.div)`
  margin-top: 200px;
  width: 70px;
  cursor: pointer;
  padding: 0 5px;
  border-top: black 1px solid;
  border-bottom: black 1px solid;
`;

const LogoutButton: React.SFC<IProps> = ({ onLogoutSuccess }) => (
  <Button onClick={onLogoutSuccess}> 로그아웃 </Button>
);

export default LogoutButton;
