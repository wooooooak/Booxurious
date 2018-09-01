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
  background-image: url('https://cdn.pixabay.com/photo/2016/03/27/19/32/blur-1283865__340.jpg');
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
  background-image: url('https://cdn.pixabay.com/photo/2015/09/02/12/33/books-918521__340.jpg');
  background-size: cover;
  background-position: center;
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
