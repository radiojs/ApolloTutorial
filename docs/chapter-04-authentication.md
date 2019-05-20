# Chapter 04. Authentication

## 인증 구현 방식

크게 Cookie 방식과 JSON Web Token(JWT) 방식으로 인증 기능을 구현할 수 있다.
대체로 선호하는 방식은 JWT 방식인데 여기에는 한 가지 약점이 있는데, 그것은 SSR로 구현하지 못한다는 점이다.

SSR을 구현하는 목적이 초기 로딩 속도의 문제와 검색엔진 최적화(SEO)의 문제라고 한다면,
인증을 통과해서 열람하는 페이지에 대하여 검색엔진 최적화가 필요하다면, 인증을 cookie 방식으로 변경해야 한다.

여기서는 JWT 방식으로 구현한다.

## 회원 가입, 로그인

회원 가입, 로그인 기능을 구현한다.

먼저 `SignInContainer.js`, `SignUpContainer.js` 파일을 통해서 두 기능을 구현한다.

`/server/lib/auth.js` 파일에는 서버에서 JWT Token 문자열을 encode, decode 하는 함수가 있다.
`/src/lib/auth.js` 파일에는 클라이언트에서 JWT Token 문자열을 localStorage에 저장하고, 읽고, 지우는 함수가 있다.

회원 가입에 성공하거나, 로그인에 성공하면, 서버는 JWT Token을 클라이언트로 전송한다.
이 Token을 localStorage에 저장해두고 있다가 서버로 요청을 보낼 때, HTTP request header에 token을 담아서 보낸다.

## JWT Token 전송과 수신

`src/app/App.js` 파일의 ApolloClient를 생성하는 과정에 다음 코드를 추가한다.

```
    const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = getAuthToken();
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });
```

`server/index.js` 파일에 ApolloServer 생성하는 과정에 다음 코드를 추가한다.

```
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: (args) => {
            const { req } = args || {};
            
            const token = req.headers.authorization || '';
            
            // retrieve the user info from the token
            try {
                const user = decodeJwtToken(token);

                // add the user to the context
                return { user };
            } catch (ex) {
                logger.error(`JWT decode failed\n${JSON.stringify(ex, null, ' ')}`);
                return { };
            }
        },
    });
```

