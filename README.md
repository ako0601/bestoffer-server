# bestoffer-server

## Build Setup

### 공통 요구사항

1. Node.js
2. Adonis.js CLI [바로가기](https://adonisjs.com/docs/4.1/installation)
3. Docker, Docker-compose
4. Postman 설치 (API 테스트 sw)
5. (Mac OS) VMware (도커 설치시)
6. (Windows) WSL2 + Ubuntu (도커 설치시)

### :bulb: 로컬에서 백엔드 개발을 위한 구성

- 구성요소: API 서버 (Adonis App)
- 구성방법
```bash
# 이 저장소 클론하기
git clone https://github.com/ako0601/bestoffer-server.git

# 저장소가 클론된 디렉토리로 이동
cd bestoffer-server

# npm 패키지 설치
npm install

# env, secret 설정

# 개발모드로 실행
npm run dev
```
이후 Postman 에서 GET http://localhost:3333 요청 혹은 <br>
브라우저에서 http://localhost:3333으로 접속

### :bulb: Docker-compose 를 이용한 로컬 개발 환경 구성

- 구성요소: 클라이언트 (Nuxt app) + 서버 (Adonis server)
- 예상 설계도: https://www.notion.so/3ab554943d714d3397027bd7c510879c

```bash
# ****** 추후 제공 예정 ******
```

## 프레임워크 기본 지식

### :bulb: 디렉토리 구조

```text
.
├── app/
  ├── Controllers/
    ├── Http/
    └── Ws/
  ├── Middleware/
  └── Models/
├── config/
  ├── app.js
  ├── auth.js
  ├── cors.js
  └── ...
├── database/
├── start/
  ├── app.js
  ├── kernel.js
  └── routes.js
├── ace
├── server.js
└── package.json
```
**app**

app 디렉토리는 어플리케이션 로직을 포함.

모델 디렉토리에서 데이터 스키마 구조 및 Firebase 연결을 정의하고, 컨트롤러에서 API 엔드포인트를 정의함.

**start**

start 디렉토리는 어플리케이션 시작시 필요한 사항들을 정의함.

app.js - 어플리케이션 시작시 필요한 외부 패키지를 포함함.

kernel.js - 서버 라우팅시 미들웨어 구조를 설정함.

routes.js - 서버의 라우트 엔드포인트를 구성함.

### :bulb: Google Firebase IS

**기본적인 Firestore 사용법**

- Collection 컬렉션: 일련의 문서들의 모음. 기존 데이터베이스의 table
- Document 문서: 여러 정보들을 가지고 있는 객체. 컬렉션 안에서 문서는 고유한 id 를 자동으로 생성하게 된다.
- field 필드: 각각의 정보들이 저장되는 키값. 기존 데이터베이스의 column.

**간단한 쿼리 검색**

```javascript
const reference = db.collection("collection_name")

// 컬렉션 전체를 가져오는 경우
reference.get().then(snapshot => {
  return snapshot
});

// 컬렉션에서 문서의 키값으로 문서를 가져오는 경우
reference.doc("doc_id").get().then(snapshot => {
  return snapshot;
});

//컬랙션에서 문서의 특정 조건으로 쿼리하는 경우
reference.where('key', '===', 'value').get().then(snapshot => {
  return snapshot;
});
```

**Firebase cli 설정**

```bash
# Firebase Cli npm 으로 설치
npm install -g firebase-tools

# Firebase 설정
firebase login

# 프로젝트 디렉토리로 이동
cd bestoffer-server

# Firebase 프로젝트 초기화
firebase init

# 기존 프로젝트 (best-offer) 사용 -> firestore 서비스만 선택
```

For detailed explanation on how things work, check out [Adonis.js](https://adonisjs.com/docs/4.1/installation) docs.

## 작업순서

```bash
# 1. 레포지토리를 클론한 후 develop 브랜치를 받아온다.
git checkout -t origin/develop

# 2. Develop 브랜치를 기준으로 본인 작업 브랜치를 따온다. (ex: dev-junha 혹은 dev-jk)
# (본인의 작업 브랜치는 여러개 만들어도 상관 없지만, develop 브랜치에 바로 개발하지 않도록 하는것이 좋다.)
git checkout -b dev-<yourname>

# 3. 해당 페이지 작업을 적절히 본인 작업 브랜치에 커밋하고 푸시한다.
# 4. 푸시하는 경우 본인 작업 브랜치로 푸시한다.
git add .
git commit -m "some message"
git push origin dev-<yourname>

# 5. 한 페이지 혹은 적당한 분량의 작업이 끝났으면 develop 브랜치로 pull request (PR)를 생성한다.
# 6. 팀원들의 코드 리뷰 후 해당 브랜치를 develop 으로 머지한다.
# 7. 머지가 완료되면 로컬에서 develop 브랜치와 본인의 작업 브랜치에 pull 한다.
git pull origin develop

# 8. 실제 서비스를 위해 develop 브랜치를 master로 머지하면, 자동으로 배포가 가능하다. 😎
```

## 예제 설명

- 빌드를 성공적으로 마치면 http://localhost:3333 으로 접속하면 해당 json 내용을 볼 수 있습니다.
```json
{"greeting":"Hello world in JSON"}
```
- http://localhost:3333/notices 로 접속하면 firestore 의 notice 컬렉션 내의 모든 문서가 json 형식으로 로드됩니다.
- Postman 을 이용해서 POST http://localhost:3333/notices/add 요청을 다음 body 형식과 함께 보내면 firestore 의 notice 컬렉션에 새로운 문서가 추가됩니다.

```json
{
  "writer":"작성자명",
  "title":"제목",
  // 그 외 포함하고 싶은 key : value set
}

```

---
### TEAM OAKS 콜라보레이션 [Notion 바로가기](https://www.notion.so/Collaboration-22c1188040124b10a4edeed2557a731f)