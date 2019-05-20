# Chapter 05. Local state management

Apollo GraphQL은 Apollo Client v2.5 이상의 버전에서 Apollo cache에 local state를 관리하는 방법을 제공한다.

이 방법을 이용하면 React Redux를 대체할 수 있다.

Local state의 값을 수정하는 방법을 크게 두 가지가 있다. 
하나는 `cache.writeDate`를 호출하여 cache에 직접 기록하는 방법이고,
다른 하나는 `Mutation` 방식을 이용하여 클라이언트에서 resolver를 호출하는 방법이다.

## Cache에 직접 쓰기

이 경우는 GraphQL mutation이나 resolver 함수가 필요없다.

`ApolloConsumer`, `Query` 컴포넌트의 `render` 속성에 매개변수로 `client`가 있는데 이의 메서드에 `writeData`가 있다.


