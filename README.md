# <center>Booxurious</center>

## booxurious란?
book + luxurious의 합성어입니다. 책을 읽고 리뷰를 쓰며, 생각을 공유하는 공간입니다. 또한 최고의 책 추천은 어떤 인공지능보다도, 자신과 취향이 맞는 사람의 도서 목록이라는 믿음으로 시작된 프로젝트입니다.

## 로컬에서 실행하기
1. booxurious를 클론한 후, frontend, backend 폴더로 각각 진입해 의존 모듈을 설치합니다.(npm install 또는 yarn)

2. mysql이 필요합니다. 로컬에 mysql을 설치해주고, 원하는 이름(booxurious추천)으로 스키마를 만들어줍니다. 

3. backend/src 폴더를 보면 config.example.js 파일과 secret.example.js 파일이 있습니다.
```
// config.example.js
export const config = {
  db_config_local: {
    database_name: "booxurious",
    username: "your-name",
    password: "your-password",
    dialect: "mysql",
    host: "localhost",
    port: 3306
  },
  db_config_aws: {
    database_name: "booxurious",
    username: "your-name",
    password: "0000",
    dialect: "your-password",
    host: "",
    port: 3306
  }
};
```
```
// secret.example.js
export const jwtSecretKey = "secret-key";
```

config.example.js 파일에 데이터베이스 설정을 등록(aws는 사용하지 않아도 로컬에서 동작하는데 상관없습니다.), secret.example.js 파일에는 jwt에서 사용할 secret key를 입력합니다.

모두 입력했다면 동일한 경로에 config.js, secert.js 파일을 각각 만들어 복사 붙여넣기 해줍니다.

## 실행하기
1. 먼저 backend 디렉터리에 진입 후, yarn dev를 입력하여 서버를 구동시킵니다.
2. 이후 frontend 디렉터리에 진입하여 yarn start 명령어로 앱을 구동시킵니다.


## 기술 스택
### frontend
* react
* redux
* typescript
* styled-components

### backend
* nodeJS , Express
* aws lambda
* aws-serverless-express
* jwt (authenticate)
* mysql