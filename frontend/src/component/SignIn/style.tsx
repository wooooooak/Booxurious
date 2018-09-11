import styled from 'styled-components';

export const PageLayout = styled.div`
  background-image: url("https://s3.ap-northeast-2.amazonaws.com/elebooks/img/main.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

export const ContentBackground = styled.div`
  position: fixed;
  opacity: 0.9;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  background-color: white;
  /* box-shadow: 1px 1px 20px black; */
  border-radius: 20px;
  height: 430px;
  width: 400px;
  padding: 20px 50px;
`;

export const Content = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  height: 400px;
  padding: 50px 50px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  background-size: auto;
`;

export const Input = styled.input`
  /* width: 300px; */
  height: 40px;
  text-align: center;
  /* padding-left: 15px; */
  background-color: transparent;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-top: 30px;
  outline: none;
  font-size: 1.2rem;
  /* color: white; */
  border: none;
`;
export const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 60px;
  margin-top: -20px;
`;

export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background: black;
`;

export const Text = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 1.1rem;
  color: black;
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
  font-family: 'Noto Sans KR', sans-serif;
  /* color: #fffff3; */
`;

export const GoogleLoginText = styled.span`
  font-size: 1.1em;
  font-weight: bold;
`;
