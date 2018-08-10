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
  /* padding: 50px 100px; */
  background: fixed;
  background-color: #f2f5f7;
  margin-top: 30px;
  /* background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-frontend/book2.jpg');
  background-repeat: no-repeat;
  background-size: cover; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Category = styled.text`
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: -30px;
  color: black;
  font-size: 1.5em;
`;

const CardCollectionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-image: url('https://cdn.pixabay.com/photo/2017/02/25/16/54/high-tech-2098210_960_720.jpg');
  background-repeat: no-repeat;
  background-size: cover; */
  /* border-radius: 8px; */
  /* box-shadow: 2px 3px 7px #6e7783; */
`;

const PrevButton = CaretLeft.extend`
  margin-right: 100px;
  cursor: pointer;
`;
const NextButton = CaretRight.extend`
  margin-left: 100px;
  cursor: pointer;
`;
const ArticleLayout: React.SFC<Props> = ({
  children,
  category,
  onClickNextPageButton,
  onClickPrevPageButton
}) => (
  <Layout>
    <Category>{category}</Category>
    <CardCollectionBox>
      <PrevButton onClick={onClickPrevPageButton} size={60} />
      {children}
      <NextButton onClick={onClickNextPageButton} size={60} />
    </CardCollectionBox>
  </Layout>
);
export default ArticleLayout;
