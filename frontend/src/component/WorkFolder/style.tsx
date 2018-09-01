import styled from 'styled-components';
import { device } from '../../styled/device';

// export const BoxShadowing = keyframes`
//   0%{
//     box-shadow: 0px 0px 0px transparent;
//   }
//   100% {
//     box-shadow: 2px 2px 50px black;
//   }
// `;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  color: black;
  width: 100%;
`;

export const LayoutLeftBox = styled.div`
  width: 50vw;
  height: calc(100vh - 70px);
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: black 1px solid;
  background: #ef3b36; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffffff,
    #ef3b36
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff,
    #ef3b36
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
  background: #ffefba; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffffff,
    #ffefba
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff,
    #ffefba
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  transition: 1s;
  :hover {
    width: 75%;
  }
`;

export const QuillStyle = styled.div`
  width: 700px;
  margin: 0 auto;
  /* margin-left: 600px; */
  .ql-container.ql-snow {
    font-size: 1.2em;
    border: none;
  }

  /* @media ${device.laptopL} {
    margin-left: 450px;
  } */
`;
