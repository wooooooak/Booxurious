import * as React from 'react';
import styled from 'styled-components';

interface IProps {}

interface IState {
  introText: string[][];
  selectedNumber: number;
}

const Layout = styled.div`
  background: fixed;
  background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks/book2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
`;

const ContextBox = styled.div`
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-top: -150px; */
`;

const IntroTextNumber = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Modern+Antiqua');
  color: black;
  font-family: 'Modern Antiqua', cursive;
  font-size: 2em;
  margin-bottom: 80px;
`;

const TextBox = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Myeongjo');
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.7em;
  font-family: 'Nanum Myeongjo', serif;
  line-height: 0.1em;
`;

class IntroOne extends React.Component<IProps, IState> {
  state = {
    introText: [
      [ '읽었다고 읽은 것이 아닙니다', '작성하고, 공유하고,', '되짚어야 읽은 것입니다' ],
      [ '작가를 꿈꾸시나요?', '자신만의 글을 작성하세요', '베스트셀러가 될 수도 있습니다.' ],
      [ '이건 3번째 입니다', '무슨 말을 넣을까요?', '베스트셀러가 될 수도 있습니다.' ]
    ],
    selectedNumber: 1
  };

  onClickPrevTextButton = () => {
    this.setState({
      selectedNumber: this.state.selectedNumber - 1
    });
  };
  onClickNextTextButton = () => {
    this.setState({
      selectedNumber: this.state.selectedNumber + 1
    });
  };

  mapTextToDiv = (selectedNumber: number) => {
    const resultText: JSX.Element[] = this.state.introText[
      selectedNumber
    ].map((text, index) => {
      return <p key={index}>{text}</p>;
    });
    return resultText;
  };

  render () {
    const { selectedNumber } = this.state;
    return (
      <Layout>
        <IntroTextNumber>{selectedNumber + 1}</IntroTextNumber>
        <ContextBox>
          {selectedNumber <= 0 ? (
            <span />
          ) : (
            <span onClick={this.onClickPrevTextButton}>prev</span>
          )}
          <TextBox>{this.mapTextToDiv(selectedNumber)}</TextBox>
          {selectedNumber >= 2 ? (
            <span />
          ) : (
            <span onClick={this.onClickNextTextButton}>next</span>
          )}
        </ContextBox>
      </Layout>
    );
  }
}

export default IntroOne;
