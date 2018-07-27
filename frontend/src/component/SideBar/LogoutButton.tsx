import * as React from 'react';

interface IProps {
  socialProvider: string;
}

const LogoutButton: React.SFC<IProps> = ({ socialProvider }) => (
  <span>{socialProvider} logout</span>
);

export default LogoutButton;
