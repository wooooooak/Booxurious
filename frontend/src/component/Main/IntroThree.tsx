import * as React from 'react';
import styled from 'styled-components';

const IntroThreeContrainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  background-color: #f8f4f3;
  height: 100vh;
  width: 100vw;
`;

class IntroThree extends React.Component<{}, {}> {
  render () {
    return <IntroThreeContrainer>this is three</IntroThreeContrainer>;
  }
}

export default IntroThree;
