---
title: YouTube Download 웹앱 개발
description: This is a description for the article about me
category: javascript
tags:
- web development
---

# YouTube Download 웹앱 개발

뭔가 사이드 프로젝트를 하나 해보고 싶다는 생각이 문득 들었다.

그러던 중 [ytdl-core](https://github.com/fent/node-ytdl-core#readme) 라는 재밌는 프로젝트를 발견하고 개발을 진행해보고자 한다.

## ytdl-core 는 무슨 라이브러리인가?

ytdl-core 는 Nodejs 의 Stream Interface 를 사용하는 Youtube download API 이다.

```jsx
const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
  .pipe(fs.createWriteStream('video.mp4'));
```

이렇게 유튜브 영상의 주소만 입력하면 스트림 형태로 데이터를 받을 수 있도록 도와주는 유용한 라이브러리이다. 😎

## 그런데 문제가 발생했다 😭

해당 라이브러리를 Web 에서 바로 쓸려고 시도해봤는데 무수한 CORS 에러의 요청을 받게되었다 😭

![Error Image](/images/making_youtube_download_web_application_1/1.png)

무수한 CORS 에러의 요청이라니 😲


#### CORS (Cross-Origin Resource Sharing) 이란 무엇인가요 ?

>추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.

해당 프로젝트 [GitHub Issue](https://github.com/fent/node-ytdl-core/issues/561) 를 둘러보니까 이미 해당 증상으로 수 많은 사람들이 질문을 한걸 파악했다. 클라이언트에서 직접 해당 라이브러리를 사용하려면 아래와 같이 HttpsProxyAgent 를 이용해 우회접근하는 방법을 써야한다.


```jsx
const ytdl = require('..');
const HttpsProxyAgent = require('https-proxy-agent');

// Remove 'user:pass@' if you don't need to authenticate to your proxy.
const proxy = 'http://user:pass@111.111.111.111:8080';
const agent = HttpsProxyAgent(proxy);

const stream = ytdl('https://www.youtube.com/watch?v=aqz-KE-bpKQ', {
  requestOptions: { agent },
});

console.log('Starting Download');

stream.on('data', chunk => {
  console.log('downloaded', chunk.length);
});

stream.on('error', err => {
  console.error(err);
});

stream.on('end', () => {
  console.log('Finished');
});
```

#### Proxy Server 는 무엇인가요?

>클라이언트가 자신을 통해서 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해 주는 컴퓨터 시스템이나 응용 프로그램을 가리킨다.

그런데, 안정적인 무료 프록시 서버를 구하기도 힘들고 직접 구현하기도 뭐해서 그냥 [N](http://node.us)ode + Express 로 직접 백엔드를 구현하고자 한다.
