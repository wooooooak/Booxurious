import * as React from "react";
import styled from "styled-components";

import MenuContainer from "../container/MenuContainer";
import WritingBookReviewContainer from "../container/WritingBookReviewContainer";

const PageLayout = styled.div`
  padding: 70px 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WritingBookReviewPage: React.SFC<{}> = () => (
  <React.Fragment>
    <MenuContainer />
    <PageLayout>
      <WritingBookReviewContainer />
    </PageLayout>
  </React.Fragment>
);

export default WritingBookReviewPage;
