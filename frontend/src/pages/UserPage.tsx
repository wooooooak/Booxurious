import * as React from 'react';
import styled from 'styled-components';

import MenuContainer from '../container/MenuContainer';

import Tag from '../component/Menu/Tags';

export const Div = styled.div`
  background: url('https://cdn.pixabay.com/photo/2015/09/02/12/28/pencil-918449_960_720.jpg')
    center/cover;
`;

const UserPage: React.SFC<{}> = () => {
  return (
    <Div>
      <MenuContainer>
        <Tag />
      </MenuContainer>
    </Div>
  );
};

export default UserPage;
