import * as React from "react";
import styled from "styled-components";

import MenuContainer from "../container/MenuContainer";

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url('https://cdn.pixabay.com/photo/2017/05/12/08/30/typewriter-2306479_960_720.jpg'); */
  background-repeat: no-repeat;
  background-size: cover;
`;

const WritingWorkPage: React.SFC<{}> = () => (
  <PageLayout>
    <MenuContainer />
  </PageLayout>
);

export default WritingWorkPage;
