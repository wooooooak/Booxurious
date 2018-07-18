import * as React from 'react';
import styled from 'styled-components';

interface IProps {}

interface IState {}

const IntroTwoContrainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: #011627;
  height: 100vh;
  width: 100vw;
`;

class IntroTwo extends React.Component<IProps, IState> {
  render () {
    return <IntroTwoContrainer />;
  }
}

export default IntroTwo;
