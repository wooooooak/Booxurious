import * as React from 'react';
import styled from 'styled-components';

interface IProps {}

interface IState {}

const IntroTwoContrainer = styled.div`
  padding-top: 70px;
  background-color: #f8f4f3;
  height: 100vh;
  width: 100vw;
`;

class IntroTwo extends React.Component<IProps, IState> {
  render () {
    return (
      <IntroTwoContrainer>
        <div>hello</div>
        <div>world</div>
      </IntroTwoContrainer>
    );
  }
}

export default IntroTwo;
