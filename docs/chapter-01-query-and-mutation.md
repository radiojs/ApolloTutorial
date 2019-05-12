# Getting started

Express 서버와 React 앱 사이에 Apollo GraphQL 을 이용한 연결을 구성한다.

이 프로젝트는 ReactTutoral Chapter 7의 소스로부터 시작한다.

ReactTutorial Chapter 7. 상태는 Express server와 React Client를 연동한 상태이다.

Redux는 아직 다루지 않은 상태이다. Apollo GraphQL이 Redux를 대체하는 기능을 하기 때문이다.

## Apollo GraphQL 서버 설정

설치할 패키지는 다음과 같다:

```
    $ yarn add apollo-server graphql
```

이것은 Apollo Server 를 단독으로 설치하여 사용하는 경우이다. 만약 Express 서버와 연결하여 사용하려면 다음과 같이 바꿔야 한다.

```
    $ yarn add apollo-server graphql apollo-server-express
```

### Schema and Resolver  

다음은 Schema를 작성한다. `server/schema/blog.js` 파일을 만들고 다음과 같이 입력한다:

```
    import { gql } from 'apollo-server';

    const typeDefs = gql`
        type Blog {
            _id: ID!
            title: String
        }

        type Query {
            blogList: [Blog]
        }
    `;

    export default typeDefs;
```

여기서 `Blog`는 데이터 형식을 의미한다. `_id`와 `title` 속성을 가지는 객체 자료형이다.

그리고 `Query`의 `blogList`는 `Blog` 자료형의 배열을 리턴하는 조회요청 메서드를 의미한다.

다음은 Resolver를 작성한다. `server/resolver/blog.js` 파일을 만들고 다음과 같이 입력한다:

```
    const resolvers = {
        Query: {
            blogList() {
                return [{
                    _id: 1,
                    title: 'Seoul',
                }, {
                    _id: 2,
                    title: 'Tokyo',
                }, {
                    _id: 3,
                    title: 'London',
                }, {
                    _id: 4,
                    title: 'Paris',
                }];
            }
        }
    };

    export default resolvers;
```

앞서 Schema 파일의 Query blogList와 동일한 이름의 메서드 정의가 작성되어 있다.

즉, 클라이언트로부터 `blogList` 요청을 받으면, 4개의 객체를 가지는 Blog 자료형을 리턴한다.

### Express Apollo Server

이번에는 Express 서버에 Apollo Server를 연동한다.

`server/index.js` 파일에 다음 항목을 추가한다:

```
    ...
    import { ApolloServer } from 'apollo-server-express';
    import typeDefs from './schema/blog';
    import resolvers from './resolver/blog';

    ...

    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
    });
    apollo.applyMiddleware({ app });

```

즉, 기존의 Express app 서버에 미들웨어로 ApolloServer를 연동한다.

서버를 실행하고 브라우저에서 `http://localhost:4000/graphql` 주소로 접속해본다.
정상적으로 작동한다면 Playground 화면이 나타난다.

화면 왼쪽에 다음을 입력하고 화면 중앙의 실행 버튼를 눌러보자:

```
    query {
        blogList {
            _id
            title
        }
    }
```

이 명령은 Schema의 Query 에서 정의한 blogList 메서드를 호출하는 과정이다.  
이 때, 리턴되는 Blog 자료형의 속성을 _id, title 두 가지를 요청한 것이다.

결과는 예상한대로 배열값이 리턴될 것이다.

여기까지가 Apollo graphQL 서버 작업이다.

## Apollo GraphQL 클라이언트 설정

다음 패키지를 추가한다:

```
    $ yarn add apollo-client apollo-cache-inmemory apollo-link-http react-apollo graphql-tag
```

`src/modules/blog/apollo/queries.js` 파일에 클라이언트가 Apollo Server 로 요청하는 query 코드를 작성한다.

```
    const BLOG_LIST = gql`
        query BlogList {
            blogList {
            _id
            title
            }
        }
    `;
```

`BlogListContainer.js` 파일과 `BlogList.js` 파일을 작성한다.

UI를 담당하는 `BlogList.js` 파일은 기존과 동일하고, 프로세스를 담는 `BlogListContainer.js` 파일에 Query 코드를 추가한다.


## Apollo 서버에서의 Mutation

Mutation 은 변경사항을 처리하는 프로세스이다. 새로 blog를 등록하는 과정은 Mutation을 통해서 구현한다.  

서버 쪽에서는 Query 기능을 구현하는 과정과 비슷하다.  

먼저 Schema를 등록한다.

```
    ...
    const typeDefs = gql`
        ...

        type Mutation {
            myBlogNew(title: String): Blog
        }
    `;
```

다음 resolver 를 구성한다.

```
    const blogs = [{
        _id: '1',
        title: 'Seoul',
    }, {
        _id: '2',
        title: 'New York',
    }, {
        _id: '3',
        title: 'London',
    }, {
        _id: '4',
        title: 'Paris',
    }];

    const resolvers = {
        Query: ...,

        Mutation: {
            myBlogNew(root, { title }) {
                blogs.push({ 
                    _id: (blogs.length + 1).toString(),
                    title,
                });

                return blogs[blogs.length - 1];
            }
        }
    };

```

### 클라이언트

`src/modules/blog/apollo/queries` 파일에 mutation 코드를 다음과 같이 넣는다:

```
    const MY_BLOG_NEW = gql`
    mutation MyBlogNew($title: String) {
        myBlogNew(title: $title) {
            _id
            title
        }
    }
    `;
```

`MyBlogNewContainer.js`, `MyBlogNew.js` 파일을 작성한다.

이 기능은 Modal UI로 구성한다. 즉, 별도의 경로를 가져서 Router를 통하는 방식이 아니다.
목록 페이지에서 새로운 blog 를 등록하는 버튼을 누르면, Modal 화면이 나타나고 여기서 Form 컴포넌트를 통해서 
데이터를 입력받아 처리한다.

이 때, MyBlogNewContainer 객체는 controlled component 방식으로 작성한다. 즉, 변경 내역이 모두 
상위 컴포넌트로 전달되고 상위 컴포넌트에서 이 컴포넌트의 보임과 숨김을 처리하게 구현한다.

이와 같이 코드를 작성하고 실행해보면, 정상적으로 새 blog 가 등록되는 것을 볼 수 있다.


