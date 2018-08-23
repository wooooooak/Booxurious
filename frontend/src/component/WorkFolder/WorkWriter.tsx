import * as React from 'react';
import styled from 'styled-components';

const PageLayout = styled.div`
  width: 700px;
  max-width: 750px;
  height: 100px;
  background-color: blue;
`;

const WorkWriter: React.SFC<{}> = () => {
  return <PageLayout />;
};

export default WorkWriter;
