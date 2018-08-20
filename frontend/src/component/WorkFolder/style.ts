import styled, { keyframes } from 'styled-components';

export const BoxShadowing = keyframes`
  0%{
    box-shadow: 0px 0px 0px transparent;
  }
  100% {
    box-shadow: 5px 5px 30px black;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: white;
`;

export const LayoutLeftBox = styled.div`
  width: 700px;
  height: 600px;
  background-color: #1e272e;
  border-radius: 15px;

  animation: ${BoxShadowing} 2s forwards;
`;

export const LayoutRightBox = styled.div`
  width: 700px;
  height: 600px;
  background-color: #1e272e;
  border-radius: 15px;
  animation: ${BoxShadowing} 2s forwards;
`;
