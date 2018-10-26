import * as React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100vw;
  height: 500px;
  background-color: white;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-image/book2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LeftSideLyout = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const RightSideLayout = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 80px;
`;

const Title = styled.input.attrs({
  placeholder: "제목을 입력하세요"
})`
  font-size: 3em;
  margin-bottom: 50px;
  background-color: transparent;
  border-style: none;
  
`;
const SubTitle = styled.textarea.attrs({
  placeholder: "소제목을 입력하세요"
})`
  font-size: 1.7em;
  background-color: transparent;
  border-style: none;
  width: 300px;
  height: 100px;
  resize: none;
  `;

export interface Props {
  type: "write" | "read";
  postTitle: string;
  subTitle?: string;
  onChangeTitle?(e: React.FormEvent<HTMLInputElement>): void;
  onChangeSubTitle?(e: React.FormEvent<HTMLTextAreaElement>): void;
}

export type Ref = HTMLDivElement;

const Cover = React.forwardRef<Ref, Props>(
  (props, ref) =>
    props.type === "write" ? (
      <div ref={ref}>
        <Layout>
          <LeftSideLyout>{props.children}</LeftSideLyout>
          <RightSideLayout>
            <Title onChange={props.onChangeTitle} value={props.postTitle} />
            <SubTitle onChange={props.onChangeSubTitle} value={props.subTitle} />
          </RightSideLayout>
        </Layout>
      </div>
    ) : (
      <Layout>
        <LeftSideLyout>{props.children}</LeftSideLyout>
        <RightSideLayout>
          <Title value={props.postTitle} />
          <SubTitle value={props.subTitle} />
        </RightSideLayout>
      </Layout>
    )
);

export default Cover;
