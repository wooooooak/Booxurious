import * as React from 'react';
import styled from 'styled-components';

import Article from '../Article';

const IntroThreeContrainer = styled.div`
  display: flex;
  padding-top: 70px;
  background-color: #f8f4f3;
  width: 100vw;
`;

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 550px;
  width: 55vw;
`;
const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45vw;
`;

class IntroThree extends React.Component<{}, {}> {
  render () {
    return (
      <IntroThreeContrainer>
        <LeftSideContainer>
          <Article category="소설" />
          <Article category="IT 서적" />
          <Article category="자기계발" />
        </LeftSideContainer>
        <RightSideContainer />
      </IntroThreeContrainer>
    );
  }
}

export default IntroThree;
