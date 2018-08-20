import * as React from 'react';
import styled from 'styled-components';

import FolderConatiner from '../container/FolderConatiner';

const PageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: space-around;
  justify-content: center;
  background-image: url('https://cdn.pixabay.com/photo/2015/03/26/10/23/notepad-691250_960_720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const BoxLine = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BackButton = styled.div`
  margin-top: 100px;
  width: 200px;
  height: 50px;
  background-color: white;
  margin: 100px auto -80px;
  border-radius: 50px;
`;

const ChoiceFolderOrWritingPage: React.SFC<{}> = () => (
  <PageLayout>
    <BoxLine>
      <FolderConatiner />
    </BoxLine>
    <BackButton />
  </PageLayout>
);

export default ChoiceFolderOrWritingPage;
