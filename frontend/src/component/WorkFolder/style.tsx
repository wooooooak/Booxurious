import styled from "styled-components";
import styledTS from "styled-components-ts";
// import { device } from '../../styled/device';

interface Props {
  isAffixToolbar: boolean;
}

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 50px 0;
  color: black;
  width: 100%;
`;

export const LayoutLeftBox = styled.div`
  width: 50vw;
  height: calc(100vh - 70px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-image/writer-1421099_1920.jpg');
  background-size: cover;
  transition: 1s;
  :hover {
    width: 75%;
  }
`;

export const LayoutRightBox = styled.div`
  width: 50vw;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://s3.ap-northeast-2.amazonaws.com/elebooks-image/pencil-918449_1920.jpg');
  background-size: cover;
  background-position: center;
  transition: 1s;
  :hover {
    width: 75%;
  }
`;

export const QuillStyle = styledTS<Props>(styled.div)`
  width: 700px;
  margin: 0 auto;
  .ql-container.ql-snow {
    font-size: 1.2em;
    border: none;
  }

  .ql-toolbar {
    z-index: 999;
    position: ${(props) => (props.isAffixToolbar ? "fixed" : "static")};
    top: 70px;
    background: ${(props) => (props.isAffixToolbar ? "#F0E5DE" : "")}
  }

`;
