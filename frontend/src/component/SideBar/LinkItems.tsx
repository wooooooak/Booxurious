import * as React from "react";
// import styled from "styled-components";
import { Avatar } from "antd";

import { ItemConatiner, Item } from "./style";

interface Props {
  username: string | null;
  profileImg: string;
}

const LinkItems: React.SFC<Props> = ({ username, profileImg }) => {
  if (username !== "") {
    return (
      <ItemConatiner>
        {profileImg !== "" ? (
          <Avatar style={{ marginTop: "-35px", marginBottom: "1.5em" }} src={profileImg} size={90} />
        ) : (
          <Avatar
            style={{
              backgroundColor: "#F9B26B",
              marginTop: "-35px",
              marginBottom: "1.5em"
            }}
            size={90}
            icon="user"
          />
        )}
        <Item to="/">홈</Item>
        <Item to="/write_review">독후감 쓰기</Item>
        <Item to="/folder">내 책 연재하기</Item>
        <Item to="/">작품 발굴하기(아직)</Item>
        <Item to="/">나의 팔로우들(아직)</Item>
        <Item to="/plan">일주일 프로젝트</Item>
        <Item to={`/user/${username}`}>설정</Item>
      </ItemConatiner>
    );
  } else {
    return null;
  }
};

export default LinkItems;
