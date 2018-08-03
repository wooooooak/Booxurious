import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

interface Props {
  category: string;
}

interface IArticle {
  imgSrc: string;
  title: string;
  subTitle?: string;
  author: string;
  like: number;
}

interface State {
  articles: IArticle[];
}

const ContainerBox = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;
const CategoryName = styled.div`
  font-size: 1.1em;
  @import url('https://fonts.googleapis.com/css?family=Gothic+A1');
  font-family: 'Gothic A1', sans-serif;
`;
const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #383a3f;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

interface IImageBook {
  src: string;
}

const ImageBook = styledTS<IImageBook>(styled.img)`
src: ${(props) => props.src};
width: auto; height: auto;
max-width: 150px;
max-height: 150px;

`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
`;

const BookTitle = styled.div`
  font-size: 1.1em;
  @import url('https://fonts.googleapis.com/css?family=Gothic+A1');
  font-family: 'Gothic A1', sans-serif;
  font-weight: bold;
`;

class Article extends React.Component<Props, State> {
  state = {
    articles: [
      {
        imgSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA',
        title: 'harry porter',
        subTitle: 'this is subtitle',
        author: 'me',
        like: 0
      },
      {
        imgSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA',
        title: 'harry porter',
        subTitle: 'this is subtitle',
        author: 'you',
        like: 0
      },
      {
        imgSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA',
        title: 'harry porter',
        subTitle: 'this is subtitle',
        author: 'me',
        like: 0
      },
      {
        imgSrc:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA',
        title: 'harry porter',
        subTitle: 'this is subtitle',
        author: 'me',
        like: 0
      }
    ]
  };

  mapToArticle = () => {
    let result: any[];
    result = this.state.articles.map((article, index) => {
      return (
        <ContentBox key={index}>
          <ImageBook src={article.imgSrc} />
          <Content>
            <BookTitle>{article.title}</BookTitle>
            <p>{article.subTitle}</p>
            <p>
              {article.author} <span>{article.like}</span>
            </p>
          </Content>
        </ContentBox>
      );
    });
    return result;
  };

  render () {
    const { category } = this.props;
    return (
      <ContainerBox>
        <CategoryName>{category}</CategoryName>
        <Hr />
        {this.mapToArticle()}
      </ContainerBox>
    );
  }
}

export default Article;
