import * as React from 'react';

import MenuContainer from '../container/MenuContainer';
import SignInContainer from '../container/SignInContainer';

const SignUpPage: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <MenuContainer />
      <SignInContainer />
    </React.Fragment>
  );
};

export default SignUpPage;
