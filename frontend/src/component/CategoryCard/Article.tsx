import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

import { Idata } from '../../container/CategoryCardContainer';

interface Props {
  datas: Idata;
}

interface ICardLayout {
  img?: string;
}

const CardLayout = styledTS<ICardLayout>(styled.div)`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 300px;
  border-radius: 8px;
  background-image: ${(props) => `url('${props.img}')`};
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: flex-end;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  cursor: pointer;
  margin: 0 15px;
  `;

const ContentArea = styled.div`
  color: white;
  font-size: 2em;
  font-weight: bold;
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
