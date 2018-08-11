import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

const ItemConatiner = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled(Link)`
  margin-top: 30px;
  text-decoration: none;
  color: black;
`;

const LinkItems: React.SFC<Props> = () => (
  // <ItemConatiner>{mapDataToItemList(datas)}</ItemConatiner>
  <ItemConatiner>
    <Item to="/writingBookReview">독후감 쓰기</Item>
    <Item to="/">내 글 연재하기</Item>
    <Item to="/">작품 발굴하기</Item>
    <Item to="/">나의 팔로우들</Item>
    <Item to="/">설정</Item>
  </ItemConatiner>
);

export default LinkItems;
