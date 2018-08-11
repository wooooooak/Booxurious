import * as React from 'react';
import styled from 'styled-components';

import { CaretLeft } from 'styled-icons/fa-solid/CaretLeft';
import { CaretRight } from 'styled-icons/fa-solid/CaretRight';

interface Props {
  children: any;
  category: string | undefined;
  onClickNextPageButton(): void;
  onClickPrevPageButton(): void;
}

const Layout = styled.div`
  height: 60vh;
  background: fixed;
  background-color: #f2f5f7;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
`;

const Category = styled.text`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  color: black;
  font-size: 1.9em;
`;

const PrevButton = CaretLeft.extend`
  margin-right: 50px;
  cursor: pointer;
`;

const NextButton = CaretRight.extend`
  margin-left: 50px;
  cursor: pointer;
`;

const CardCollectionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ArticleLayout: React.SFC<Props> = ({
  children,
  category,
  onClickNextPageButton,
  onClickPrevPageButton
}) => (
  <Layout>
    <CategoryDiv>
      <PrevButton onClick={onClickPrevPageButton} size={60} />
      <Category>{category}</Category>
      <NextButton onClick={onClickNextPageButton} size={60} />
    </CategoryDiv>
    <CardCollectionBox>{children}</CardCollectionBox>
  </Layout>
);
export default ArticleLayout;
