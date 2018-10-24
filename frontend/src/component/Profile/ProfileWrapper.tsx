import * as React from "react";
import styled from "styled-components";

import { PostState } from "../../store/modules/Post";

const Div = styled.div`display: flex;`;
const RightSide = styled.div`flex: 2;`;

interface Props {
  postDatas: PostState[];
}

const ProfileWrapper: React.SFC<Props> = ({ postDatas }) => {
  return (
    <Div>
      <RightSide>{postDatas}</RightSide>
    </Div>
  );
};

export default ProfileWrapper;
