import * as React from 'react';
import styled from 'styled-components';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';

import 'react-virtualized/styles.css';

interface Datum {
  source: string;
  caption: string;
  imageHeight: string;
  imageWidth: string;
}

// Array of images with captions
const list: Datum[] = [
  {
    source:
      'https://ichef-1.bbci.co.uk/news/320/cpsprodpb/97BE/production/_98064883_ikea.jpg',
    caption: '1',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://i.redd.it/th5enkjgumoz.jpg',
    caption: '2',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://s3.ap-northeast-2.amazonaws.com/elebooks/book2.jpg',
    caption: '3',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://i.redd.it/th5enkjgumoz.jpg',
    caption: '4',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source:
      'https://ichef-1.bbci.co.uk/news/320/cpsprodpb/97BE/production/_98064883_ikea.jpg',
    caption: '5',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://i.redd.it/th5enkjgumoz.jpg',
    caption: '6',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://s3.ap-northeast-2.amazonaws.com/elebooks/book2.jpg',
    caption: '7',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source: 'https://i.redd.it/th5enkjgumoz.jpg',
    caption: '8',
    imageHeight: '300px',
    imageWidth: '300px'
  },
  {
    source:
      'https://ichef-1.bbci.co.uk/news/320/cpsprodpb/97BE/production/_98064883_ikea.jpg',
    caption: '9',
    imageHeight: '300px',
    imageWidth: '300px'
  }
];

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 350,
  defaultWidth: 250,
  fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 300,
  spacer: 10
});

function cellRenderer ({ index, key, parent, style }: any): any {
  const datum = list[index];

  return (
    <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
      <div style={style}>
        <img
          src={datum.source}
          style={{
            height: datum.imageHeight,
            width: datum.imageWidth
          }}
        />
        <h4 style={{ textAlign: 'center' }}>{datum.caption}</h4>
      </div>
    </CellMeasurer>
  );
}

interface IProps {}

interface IState {}

const IntroTwoContrainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  background-color: white;
  /* height: 100vh; */
  width: 100vw;
`;

const H1 = styled.h1`
  @import url('https://fonts.googleapis.com/css?family=Crete+Round');
  font-family: 'Crete Round', serif;
  font-size: 3.5em;
  margin-bottom: 50px;
`;

class IntroTwo extends React.Component<IProps, IState> {
  render () {
    return (
      <IntroTwoContrainer>
        <H1> Popular Book Reports </H1>
        <Masonry
          autoHeight={true}
          cellCount={list.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          height={1300}
          width={900}
        />
        <div>see more book reports</div>
      </IntroTwoContrainer>
    );
  }
}

export default IntroTwo;
