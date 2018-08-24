import * as React from 'react';
import styled from 'styled-components';

const EditorLayout = styled.div`
  width: 700px;
  max-width: 750px;
  height: 100px;
  background-color: blue;
  align-self: flex-start;
`;

const WorkWriter: React.SFC<{}> = () => {
  return <EditorLayout />;
};

export default WorkWriter;
