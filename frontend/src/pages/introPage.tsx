import * as React from 'react';

import IntroContainer from '../container/IntroContainer';
import CategoryCardContainer from '../container/CategoryCardContainer';
import MenuContainer from '../container/MenuContainer';

const IntroPage: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <MenuContainer />
      <IntroContainer />
      <CategoryCardContainer />
    </React.Fragment>
  );
};

export default IntroPage;
