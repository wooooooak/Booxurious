import * as React from 'react';

interface IProps {
  socialProvider: string;
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

const LogoutButton: React.SFC<IProps> = ({ socialProvider, onLogoutSuccess }) => (
  <button onClick={onLogoutSuccess}>logout</button>
);

export default LogoutButton;
