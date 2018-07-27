import * as React from 'react';
import { GoogleLogout } from 'react-google-login';

interface IProps {
  socialProvider: string;
}

const SelectLogoutButton = (socialProvider: string) => {
  switch (socialProvider) {
    case 'google':
      return <GoogleLogout buttonText="logout google" />;

    default:
      return <span>log</span>;
  }
};

const LogoutButton: React.SFC<IProps> = ({ socialProvider }) =>
  SelectLogoutButton(socialProvider);

export default LogoutButton;
