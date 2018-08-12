import * as React from 'react';
import styled from 'styled-components';

import WritingBookReviewContainer from '../container/WritingBookReviewContainer';

const PageLayout = styled.div`
  padding: 70px 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WritingBookReviewPage: React.SFC<{}> = () => (
  <PageLayout>
    <WritingBookReviewContainer />
  </PageLayout>
);

export default WritingBookReviewPage;
