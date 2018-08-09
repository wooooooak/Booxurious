import * as React from 'react';
import ArticleLayout from '../component/CategoryCard/ArticleLayout';
import Article from '../component/CategoryCard/Article';
// import styled from "styled-components";

export interface IArticle {
  title: string;
  img: string;
  subTitle?: string;
  bookName: string;
  author: string;
  like: number;
}

interface IState {
  dataSet?: object[];
  selectedNumber: number;
}

export interface Idata {
  category: string;
  articles: IArticle[];
}

// login정보를 받아오자. email이 없다면 비로그인이다.
class CategoryCardContainer extends React.Component<{}, IState> {
  state = {
    dataSet: [ { category: '', articles: [] }, { category: '', articles: [] } ],
    selectedNumber: 0
  };

  constructor (props: any) {
    super(props);
  }

  componentDidMount () {
    (window as any).Kakao.init('c2f6cbb0640301748d24f77404ad204c');
    console.log((window as any).Kakao);
    // (window as any).Kakao.API
    //   .request({
    //     url: '/v2/search/book',
    //     data: { url: 'dapi.kakao.com', query: '미움받을 용기' }
    //   })
    //   .then((res: any) => {
    //     console.log(res);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
    const categoryOne: Idata = {
      category: 'IT',
      articles: [
        {
          title: 'hello',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'http://t1.daumcdn.net/thumb/R72x100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fbook%2FKOR9788996991342%3Fmoddttm=20180807084348'
        },
        {
          title: 'hello3',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        }
      ]
    };
    const categoryTwo: Idata = {
      category: '소설',
      articles: [
        {
          title: '안녕',
          subTitle: '부제목',
          author: '김작가',
          bookName: '안나 카레리나',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '밤에 우리 영혼은',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '밤에 우리 영혼은',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello3',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '오직 두 사람',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        },
        {
          title: 'hello',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '자기 앞의 생',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPxBJ4rG_8LLjzKmjk5r8omKQraLTfY0LdE5m_oroScaJxSapiKA'
        }
      ]
    };
    this.setState({
      dataSet: [ categoryOne, categoryTwo ]
    });
  }

  onClickNextPageButton = () => {
    this.setState({
      selectedNumber: this.state.selectedNumber + 1
    });
  };
  onClickPrevPageButton = () => {
    this.setState({
      selectedNumber: this.state.selectedNumber - 1
    });
  };

  render () {
    const { selectedNumber } = this.state;
    const data: Idata = this.state.dataSet[selectedNumber];
    let category;
    if (data) {
      category = data.category;
    }
    return (
      <ArticleLayout
        category={category}
        onClickNextPageButton={this.onClickNextPageButton}
        onClickPrevPageButton={this.onClickPrevPageButton}
      >
        {data ? <Article datas={data} /> : null}
      </ArticleLayout>
    );
  }
}

export default CategoryCardContainer;
