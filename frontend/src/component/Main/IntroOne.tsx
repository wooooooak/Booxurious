import * as React from 'react';
import styled from 'styled-components';

import IntroTwo from './IntroTwo';

interface IProps {}

interface IState {}

const IntroOneContrainer = styled.div`
  background-image: url('https://cdn.pixabay.com/photo/2016/01/19/14/53/book-1149031_960_720.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  /* background-color: black; */
  height: 100vh;
  width: 100vw;
`;

class IntroOne extends React.Component<IProps, IState> {
  render () {
    return (
      <div>
        <IntroOneContrainer />
        <IntroTwo />
      </div>
    );
  }
}

export default IntroOne;
