import styled from 'styled-components';

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
  color: white;
`;

export const LayoutLeftBox = styled.div`
  width: 700px;
  height: 600px;
  background-color: #1e272e;
  border-radius: 15px;
  box-shadow: 2px 2px 50px black;
  position: relative;
`;

export const LayoutRightBox = styled.div`
  width: 700px;
  height: 600px;
  background-color: #1e272e;
  border-radius: 15px;
  box-shadow: 2px 2px 50px black;
`;
