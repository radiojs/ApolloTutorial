# Chapter 03. MongoDB

이제 서버로 전송한 정보를 데이터베이스에 저장하는 과정을 구현한다.
여기서 선택한 DB는 MongoDB 이다.

## Mongoose

Mongoose는 MongoDB의 대표적인 ODM(Object Document Mapping)이다.
JavaScript의 Object와 MongoDB의 Document 사이에 1:1 매핑을 가능하게 한다.

MongoDB 데이터베이스가 설치되어 있다고 가정하고, Mongoose를 다음과 같이 설치한다.

```
    $ npm install --save mongoose
```

#### MongoDB 연결

`server/lib/mongoose.js` 파일에 MongoDB 연결 소스가 들어있다.

`server/index.js` 파일에서 이 `mongoose.js` 파일을 import 하면, 
서버가 실행될 때, MongoDB에 연결을 시도한다.

## Schema

`server/datasource/blogs.js` 파일에 BlogSchema 를 구성하고 이 객체의 Model 객체인 Blog를 
생성하여 export 한다.

## resolver 수정

`server/resolver/blog.js` 파일은 클라이언트로부터의 조회, 수정 등 요청을 처리하는 코드가 작성되어 있다.
기존 소스는 서버 메모리에 임시 저장하는 형태로 코드가 작성되어 있다.

이제 이 소스를 다음과 같이 수정하여, 데이터베이스에 읽고 쓰기를 구현한다.

```
    import Blog from '../datasource/blog';

    const resolvers = {
        Query: {
            async blogList() {
                const blogs =  Blog.find().exec();

                return blogs;
            }
        },

        Mutation: {
            async myBlogNew(root, { title }) {
                const object = { title };
                const blog = new Blog(object);
                const result = await blog.save();

                object._id = result._id;

                return object;
            }
        }
    };

    export default resolvers;
```

