# Chapter 05. Local state management

Apollo GraphQL은 Apollo Client v2.5 이상의 버전에서 Apollo cache에 local state를 관리하는 방법을 제공한다.

이 방법을 이용하면 React Redux를 대체할 수 있다.

Local state의 값을 수정하는 방법을 크게 두 가지가 있다. 
하나는 `cache.writeDate`를 호출하여 cache에 직접 기록하는 방법이고,
다른 하나는 `Mutation` 방식을 이용하여 클라이언트에서 resolver를 호출하는 방법이다.

## Cache에 직접 쓰기

이 경우는 GraphQL mutation이나 resolver 함수가 필요없다.

`ApolloConsumer`, `Query` 컴포넌트의 `render` 속성에 매개변수로 `client`가 있는데 이의 메서드에 `writeData`가 있다.

## Local resolvers

이 방법은 클라이언트에서 schema, resolver를 활용하는 방법이다.  

`@client` 지시자를 이용하여 서버에서 사용했던 schema, resolver 개념을 클라이언트에서 그대로 사용하는 것이다.

## 사례: Toast

`Toast`는 화면에 이벤트 발생을 보여주는 작은 창을 표시하는 기능을 구현한다.  
이 기능은 서버에서 동작하는 기능이 없고, 클라이언트에서만 동작한다.  

`src/modules/toast/apollo` 디렉토리에 `schema.js`, `resolvers.js` 파일을 작성한다.   
`src/modules/toast/ui` 디렉토리의 파일들은 UI를 구성한다. 이들은 cache에 저장된 데이터를 읽어서 화면에 표시한다.

이를 이용하는 기능을 `src/modules/user/ui/SignInContainer.js`에 구현한다.  
로그인에 성공했을 때, 수행하는 작업 코드에 다음 코드를 추가한다.

```
    ...                    
    client.mutate({
        mutation: TOAST_ADD,
        variables: {
            icon: 'check',
            message: 'Sign in succeded.',
        },
    });
    ...
```

이 기능은 cache의 Toast 목록 저장소에 로그인 성공 메시지를 추가한다. 

그러면, Toast UI에서 cache의 Toast 목록을 화면에 표시한다.
