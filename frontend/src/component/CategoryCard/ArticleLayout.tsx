import * as React from 'react';
import styled from 'styled-components';
interface Props {
  children: any;
  category: string | undefined;
  onClickNextPageButton(): void;
  onClickPrevPageButton(): void;
}

const Layout = styled.div`
  height: 90vh;
  padding: 50px 50px;
  background: fixed;
  background-color: #f8f4f3;
  /* background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-frontend/book2.jpg');
  background-repeat: no-repeat;
  background-size: cover; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Category = styled.div`
  margin-bottom: 20px;
  color: black;
`;

const CardCollectionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #cfaa9e;
  border-radius: 8px;
  box-shadow: 1px 3px 5px #6e7783;
`;

const PrevButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: black;
  margin-right: 100px;
`;
const NextButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: black;
  margin-left: 100px;
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
      <PrevButton onClick={onClickPrevPageButton} />
      {children}
      <NextButton onClick={onClickNextPageButton} />
    </CardCollectionBox>
  </Layout>
);
export default ArticleLayout;
