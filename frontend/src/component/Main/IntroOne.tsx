import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

import { KeyboardArrowDown } from 'styled-icons/material/KeyboardArrowDown';

import { device } from '../../styled/device';

interface IProps {
  onClickScrollDownButton(): void;
}

interface IState {
  introText: string[][];
  selectedNumber: number;
}

const Layout = styled.div`
  background: fixed;
  background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-frontend/book2.jpg');
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
  font-family: 'Nanum Myeongjo', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2.7em;
  word-break: break-all;
  /* line-height: 0.5em; */
  div {
    margin-bottom: 30px;
  }

  @media ${device.laptop} {
    font-size: 1.8em;
  }
  @media ${device.tablet} {
    font-size: 1.1em;
  }
  @media ${device.mobileM} {
    font-size: 0.6em;
  }
  @media ${device.mobileS} {
    font-size: 0.3em;
  }
`;

const BottomText = styled.div`
  position: absolute;
  top: 85%;
  font-size: 0.5em;
`;

const DownArrowBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: transparent;
  text-align: center;
  margin: 30px auto 0px;
  cursor: pointer;
`;

interface IButtonBoxProps {
  visibility: string;
}

const ButtonBox = styledTS<IButtonBoxProps>(styled.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(props) => props.visibility}
`;

const ChangeTextButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #efdc05;
  color: #efdc05;
  cursor: pointer;
`;

interface IHrProps {
  translateX: string;
}

const Hr = styledTS<IHrProps>(styled.div)`
  width: 75px;
  transform: ${(props) => `translate(${props.translateX})`};
  color: #efdc05;
  background-color: #efdc05;
  height: 1px;

  @media ${device.tablet} {
    width: 30px;
  }

  @media ${device.mobileS} {
    width: 10px;
  }

`;

class IntroOne extends React.Component<IProps, IState> {
  state = {
    introText: [
      [ '읽었다고 읽은 것이 아닙니다', '작성하고, 공유하고,', '되짚어야 읽은 것입니다' ],
      [ '작가를 꿈꾸시나요?', '자신만의 글을 작성하세요', '베스트셀러가 될 수도 있습니다.' ],
      [ '이건 3번째 입니다', '무슨 말을 넣을까요?', '베스트셀러가 될 수도 있습니다.' ]
    ],
    selectedNumber: 0
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
      return <div key={index}>{text}</div>;
    });
    return resultText;
  };

  render () {
    const { selectedNumber } = this.state;
    let prevButtonVisibility: string = '';
    let nextButtonVisibility: string = '';
    if (selectedNumber <= 0) {
      prevButtonVisibility = 'hidden';
      nextButtonVisibility = 'visible';
    } else if (selectedNumber >= 2) {
      prevButtonVisibility = 'visible';
      nextButtonVisibility = 'hidden';
    } else {
      prevButtonVisibility = 'visible';
      nextButtonVisibility = 'visible';
    }
    return (
      <Layout>
        <IntroTextNumber>{selectedNumber + 1}</IntroTextNumber>
        <ContextBox>
          <ButtonBox visibility={prevButtonVisibility}>
            <ChangeTextButton onClick={this.onClickPrevTextButton}>prev</ChangeTextButton>
            <Hr translateX="-7px" />
          </ButtonBox>
          <TextBox>
            {this.mapTextToDiv(selectedNumber)}
            <BottomText>
              글 탐방하러 가기!<DownArrowBox>
                <KeyboardArrowDown onClick={this.props.onClickScrollDownButton} />
              </DownArrowBox>
            </BottomText>
          </TextBox>
          <ButtonBox visibility={nextButtonVisibility}>
            <Hr translateX="7px" />
            <ChangeTextButton onClick={this.onClickNextTextButton}>next</ChangeTextButton>
          </ButtonBox>
        </ContextBox>
      </Layout>
    );
  }
}

export default IntroOne;
