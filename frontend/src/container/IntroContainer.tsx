import * as React from 'react';

import IntroOne from '../component/Main/IntroOne';
import IntroTwo from '../component/Main/IntroTwo';
// import IntroThree from '../component/Main/IntroThree';

interface IProps {}

interface IState {}

class IntroContainer extends React.Component<IProps, IState> {
  private introTwoLocationRef: React.RefObject<HTMLDivElement>;

  constructor (props: any) {
    super(props);
    this.introTwoLocationRef = React.createRef();
  }

  onClickScrollDownButton = () => {
    const introTwoLocation: HTMLDivElement = this.introTwoLocationRef
      .current as HTMLDivElement;
    introTwoLocation.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  render () {
    return (
      <React.Fragment>
        <IntroOne onClickScrollDownButton={this.onClickScrollDownButton} />
        <div style={{ height: '0px' }} ref={this.introTwoLocationRef} />
        <IntroTwo />
        {/* <div
          style={{
            backgroundColor: '#f8f4f3',
            textAlign: 'center',
            paddingTop: 30,
            paddingBottom: 30
          }}
        >
        </div> */}
        {/* <IntroThree /> */}
      </React.Fragment>
    );
  }
}

export default IntroContainer;
