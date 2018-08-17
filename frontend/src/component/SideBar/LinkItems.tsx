import * as React from 'react';
import { ItemConatiner, Item } from './style';
interface Props {
  username: string | null;
}

const LinkItems: React.SFC<Props> = ({ username }) => {
  if (username !== '') {
    return (
      <ItemConatiner>
        <Item to="/writingBookReview">독후감 쓰기</Item>
        <Item to="/">내 글 연재하기</Item>
        <Item to="/">작품 발굴하기</Item>
        <Item to="/">나의 팔로우들</Item>
        <Item to="/">설정</Item>
      </ItemConatiner>
    );
  } else {
    return null;
  }
};

export default LinkItems;
