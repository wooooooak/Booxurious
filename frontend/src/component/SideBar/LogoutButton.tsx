import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

interface IProps {
  socialProvider: string | undefined;
  onLogoutSuccess(): void;
}

// const SelectLogoutButton = (socialProvider: string, onLogoutSuccess: any) => {
//   switch (socialProvider) {
//     case 'google':
//       return (
//         <GoogleLogout buttonText="logout Google" onLogoutSuccess={onLogoutSuccess} />
//       );

//     default:
//       return <span>log</span>;
//   }
// };
interface LogoutButtonProps {
  onClick(): void;
}

const Button = styledTS<LogoutButtonProps>(styled.button)`
  margin-top: 200px;
  width: 50px;
`;

const LogoutButton: React.SFC<IProps> = ({ socialProvider, onLogoutSuccess }) => (
  <Button onClick={onLogoutSuccess}>logout</Button>
);

export default LogoutButton;
