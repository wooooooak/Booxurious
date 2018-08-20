import * as React from 'react';

import MenuContainer from '../container/MenuContainer';
import SignUpContainer from '../container/SignUpContainer';

const SignUpPage: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <MenuContainer />
      <SignUpContainer />
    </React.Fragment>
  );
};

export default SignUpPage;
