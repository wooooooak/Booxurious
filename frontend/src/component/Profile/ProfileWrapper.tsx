import * as React from "react";
import styled from "styled-components";

import { Timeline } from "antd";
import { PostState } from "../../store/modules/Post";

const Div = styled.div`
  display: flex;
  margin-top: 5em;
`;
const LeftSide = styled.div`flex: 7;`;
const RightSide = styled.div`
  flex: 3;
  font-size: 2em;
`;

const PostInfo = styled.div`
  cursor: pointer;
  a {
    font-size: 1.5em;
  }
  span {
    font-size: 1em;
    margin-left: 1em;
  }
`;

interface Props {
  postDatas: PostState[];
}

const mapPostsToTimeLine = (posts: PostState[]) => {
  return posts.map((el, index) => {
    return (
      <Timeline.Item key={index}>
        <PostInfo>
          <a href="#">{el.postTitle}</a>
          <span>{el.createdAt.substring(0, 10)}</span>
        </PostInfo>
      </Timeline.Item>
    );
  });
};

const ProfileWrapper: React.SFC<Props> = ({ postDatas }) => {
  return (
    <Div>
      <LeftSide />
      <RightSide>
        <Timeline>{mapPostsToTimeLine(postDatas)}</Timeline>
      </RightSide>
    </Div>
  );
};

export default ProfileWrapper;
