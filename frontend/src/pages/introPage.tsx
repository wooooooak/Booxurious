import * as React from 'react';

import IntroContainer from '../container/IntroContainer';
import CategoryCardContainer from '../container/CategoryCardContainer';
import MenuContainer from '../container/MenuContainer';

import Tag from '../component/Menu/Tags';

const IntroPage: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <MenuContainer>
        <Tag />
      </MenuContainer>
      <IntroContainer />
      <CategoryCardContainer />
    </React.Fragment>
  );
};

export default IntroPage;
