# Chapter 02. Server side rendering

SSR 기능은 SPA 방식의 두 가지 문제점인 초기 로딩 시간이 긴 문제와, 검색 엔진에 노출되지 않는 문제를 해결하는 것이 목적이다.

SSR 기능을 구현함에 있어서 핵심은 React 렌더링의 결과를 서버에서 그대로 활용하자는 부분에 있다.
그래서 Create react app 의 빌드 결과를 그대로 활용하는 방식으로 구현한다.

## SSR 구현 개요

Create react app 의 빌드를 실행하면 `/build` 디렉토리에 `index.html` 을 포함한 image, js, css 파일들이 출력된다.

이 디렉토리를 Express 서버에서 활용하도록 연결한다.

한 편, Express 서버에서는 REST API 요청, Apollo GrahpQL 요청, Static resource 요청 등을 적절하게 처리한다.

## Express 서버 설정

요청 처리의 순서를 다음과 같이 한다:

1. REST API
2. 정적 리소스
3. SSR 요청
4. Apollo GraphQL 요청

REST API와 정적 리소스는 Express의 Router 객체를 사용한다.

SSR과 Apollo GraphQL의 경우는 URI 값이 `/graphql` 인 경우는 Apollo GraphQL 요청으로 넘기고,
그 밖의 모든 요청은 SSR 요청으로 처리한다.

이 과정에서 `/` 홈 화면 경로의 경우 그 요청의 처리가 정적 리소스 요청에서 가로채지 않도록 주의해야 한다.

## SSR 구현

React App 컴포넌트는 클라이언트에서 BrowserRouter 를 사용하는 대신, 서버에서는 StaticRouter를 사용한다.

이 React App 컴포넌트를 구성하는 과정에서 Apollo GraphQL 요청을 수행하는데 이 요청은 원래 HTTP 요청으로 
수행해야 하나, 여기서는 두 서버가 동일한 시스템에 있다고 가정하므로 SchemaLink를 이용하여 내부 요청으로 처리할 수 있다.

클라이언트의 Create react app의 빌드 산출물에서 `index.html` 파일을 읽어서 그 파일 내부에 있는 
`<div id="root"></div>` 문자열을 찾아서 이를 위의 React App 컴포넌트를 문자열로 변환한 결과 문자열로 바꿔 적용한다.

## ReactDOM.hydrate

SSR을 구현한 경우에는 이미 서버에서 한 번 rendering 작업을 처리하므로, 
클라이언트에서 수행하는 ReactDOM.render(...)를 또 수행할 필요가 없다.

그래서 단순하게 ReactDOMServer에서 rendering된 콘텐츠를 이벤트 처리기에 붙이기만 한다.
이는 시스템의 수행 성능에 개선 효과를 준다.

이는 클라이언트와 서버의 산출물의 결과가 동일하다는 전제에서만 가능하다.
만약 그 산출물이 달라서 발생하는 문제는 개발자가 모두 적절하게 처리해야 한다.

