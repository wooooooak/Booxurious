import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

interface Datum {
  source: string;
  caption: string;
  title: string;
  subTitle: string;
}

// Array of images with captions
const datas: Datum[] = [
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpdH_ZhpoJM5TeBekJW0C5ZPokH-v9lC0PyzLzBRwRj_k3p-e',
    caption: '1',
    title: '보통의 존재',
    subTitle: '책을 읽고 나서'
  },
  {
    source:
      'http://file3.instiz.net/data/file3/2018/03/14/3/8/2/38268011f489980c340fb2eba6d93632.jpg',
    caption: '2',
    title: '알로하',
    subTitle: '알로하를 읽고 나서'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nH0VpFWxVDMxM159YDHHsfeG5fyhK5iqybqYsHbC9gk-GdT5',
    caption: '3',
    title: '모든 순간이 너였다',
    subTitle: '모든 순간이 너였다를 읽고 나서'
  },
  {
    source: 'http://www.iusm.co.kr/news/photo/201801/785331_359093_1115.jpg ',
    caption: '4',
    title: '기쁨의 정원',
    subTitle: '기쁘다!'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdOEvHrMASlrU9-ZmbuObwrkq01WHfqudCoWmMkGFHcN94C_1t',
    caption: '5',
    title: '인생 수업',
    subTitle: '수업이 왜 이렇게 많아?'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGxBpZOl_hdzrc-IyPTbXKyh3jhxGu1MXHI1-WuKRGsa-dxQU',
    caption: '6',
    title: '창문 넘어 도망치 100세 노인',
    subTitle: '힘도 좋다'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLc5cJS2RbAAiWI_ZODVBX-vNvncOnUGfVYWPDPD2Kt2llWlpDkA',
    caption: '7',
    title: '저녁이 깊다',
    subTitle: '응.'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5oy1p6ldyYT31p9UOYAHukjKDNMETRHUie_VvrHYkCNMHRzez',
    caption: '8',
    title: '도쿄',
    subTitle: '이건 사진이 왜이래'
  },
  {
    source:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRULNOtaQasCtflK1EbhJhdJI9sXE_ZBdUwqPewvebi2q2Mzv7Q',
    caption: '9',
    title: '홍차가 더 좋아지는 시간',
    subTitle: '홍차 좋지'
  }
];

interface IProps {}

interface IState {}

const IntroTwoContrainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f2f5f7;
  /* height: 100vh; */
`;

const Card = styled.div`
  width: 450px;
  height: 270px;
  background-color: white;
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
`;

interface IImg {
  imgSource: string;
}

const TopArea = styled.div`
  margin-bottom: auto;
  display: flex;
  flex-direction: row;
`;

const TextAreaInTopArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const Img = styledTS<IImg>(styled.div)`
  height: 230px;
  width: 150px;
  margin-top: -35px;
  margin-left: 20px;
  box-shadow: 2px 2px 30px gray;
  border-radius: 2px;
  background-image: ${(props) => `url(${props.imgSource})`};
  background-repeat: no-repeat;
  background-size: cover;
`;
const BottomArea = styled.div`
  background-color: #f8f4f3;
  height: 45px;
  width: 100%;
  margin-top: auto;
`;

const H1 = styled.h1`
  @import url('https://fonts.googleapis.com/css?family=Crete+Round');
  font-family: 'Crete Round', serif;
  font-size: 3.5em;
`;

class IntroTwo extends React.Component<IProps, IState> {
  mapDatasToList = () => {
    return datas.map((data, index) => {
      return (
        <Card key={index}>
          <TopArea>
            <Img imgSource={data.source} />
            <TextAreaInTopArea>
              <h2>title</h2>
              <div>subtitle</div>
            </TextAreaInTopArea>
          </TopArea>
          <BottomArea />
        </Card>
      );
    });
  };
  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <H1> Popular Book Reports </H1>
        <IntroTwoContrainer>{this.mapDatasToList()}</IntroTwoContrainer>
        <div style={{ textAlign: 'center' }}>see more book reports</div>
      </div>
    );
  }
}

export default IntroTwo;
