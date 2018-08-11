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
            'data:image/jpeg;base64,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'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfUQWFJOTcxcpQQxaCv_DjUFiWx_qkAPdQGnyB7aqgJC77fOY'
        },
        {
          title: 'hello3',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1UUhQvgz0o6Lo6DtOwAMVjgUkERdTSh14C880b3q21ZYcgbfV2A'
        },
        {
          title: 'hello',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: 'it book name',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxKFuMveb-x7jKD1Xqet5CwJV5OMuOtJXx_2kJp2fGghnSQOIHQ'
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
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfzzhcuXx6TExbFCsaYAAel7B6NtiXE_3ZsLJMUBcKH8mEUO1I'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '밤에 우리 영혼은',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXMKs4u9w4uAVdM-KQ7VBxEWcwktS_lR6Rm65sUCB_pktPxGHcQ'
        },
        {
          title: 'hello2',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '밤에 우리 영혼은',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yu5lnPGidFvKc7eUqwZc-8K9-cfthaeMGepGNPnvDqkRe-Ef4Q'
        },
        {
          title: 'hello3',
          subTitle: 'subtitle',
          author: 'elecoder',
          bookName: '오직 두 사람',
          like: 0,
          img:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv8onyR9cn42slxX63VQ__UJvX_CRul1jJwLu2gkWq9S3rr1pE'
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
