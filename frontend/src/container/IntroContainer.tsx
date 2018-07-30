import * as React from 'react';

import IntroOne from '../component/Main/IntroOne';
import IntroTwo from '../component/Main/IntroTwo';

interface IProps {}

interface IState {}

class IntroContainer extends React.Component<IProps, IState> {
  render () {
    return (
      <React.Fragment>
        <IntroOne />
        <IntroTwo />
      </React.Fragment>
    );
  }
}

export default IntroContainer;
