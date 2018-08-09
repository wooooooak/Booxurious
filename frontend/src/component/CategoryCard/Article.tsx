import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import styledTS from 'styled-components-ts';

import { Idata } from '../../container/CategoryCardContainer';

interface Props {
  datas: Idata;
}

interface ICardLayout {
  img?: string;
}

const hoverEffect = keyframes`
  0%{
    width: 230px;
    height: 350px;
  }

  100%{
    width: 300px;
    height: 500px;
  }
`;
const CardLayout = styledTS<ICardLayout>(styled.div)`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 350px;
  background-image: ${(props) => `url('${props.img}')`};
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: flex-end;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s ease-in-out 0.1s;
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    // animation: ${hoverEffect} 1s 0s forwards;
    // transform: scale(1.5, 1.5);
    width: 300px;
    height: 500px;
    
  }
  cursor: pointer;
  `;

const ContentArea = styled.div`
  color: white;
  font-size: 2em;
  font-weight: bold;
  &:hover {
  }
`;

class Article extends React.Component<Props, {}> {
  mapDataToCard = () => {
    const { articles } = this.props.datas;
    return articles.map((article, index) => {
      return (
        <CardLayout key={index} img={article.img}>
          <ContentArea>
            <div>{article.bookName}</div>
            <p>{article.author}</p>
          </ContentArea>
        </CardLayout>
      );
    });
  };
  render () {
    return <React.Fragment>{this.mapDataToCard()}</React.Fragment>;
  }
}

export default Article;
