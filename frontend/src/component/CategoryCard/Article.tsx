import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

import { Idata } from '../../container/CategoryCardContainer';

interface Props {
  datas: Idata;
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 450px;
  height: 300px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
`;

interface ImgProps {
  img?: string;
}

const Img = styledTS<ImgProps>(styled.div)`
  height: 230px;
  width: 160px;
  margin-left: 15px;
  box-shadow: 2px 2px 30px gray;
  background-image: ${(props) => `url('${props.img}')`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 2px;
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
        <CardLayout key={index}>
          <Img img={article.img} />
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
