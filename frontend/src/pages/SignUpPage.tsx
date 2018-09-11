import * as React from 'react';

import MenuContainer from '../container/MenuContainer';
import SignUpContainer from '../container/SignUpContainer';

import { Div } from './SignInPage';

const SignUpPage: React.SFC<{}> = () => {
  return (
    <Div>
      <MenuContainer />
      <SignUpContainer />
    </Div>
  );
};

export default SignUpPage;
