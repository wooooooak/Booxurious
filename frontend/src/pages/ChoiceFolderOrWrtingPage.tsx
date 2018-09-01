import * as React from 'react';
import styled from 'styled-components';

import FolderConatiner from '../container/FolderConatiner';
import MenuContainer from '../container/MenuContainer';

const PageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
  /* background-image: url('https://cdn.pixabay.com/photo/2015/03/26/11/10/book-692575__340.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const BoxLine = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
`;

const ChoiceFolderOrWritingPage: React.SFC<{}> = () => (
  <PageLayout>
    <MenuContainer />
    <BoxLine>
      <FolderConatiner />
    </BoxLine>
    {/* <BackButton /> */}
  </PageLayout>
);

export default ChoiceFolderOrWritingPage;
