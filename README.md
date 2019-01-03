# @anyres/core
[![codecov](https://codecov.io/gh/anyres/core/branch/master/graph/badge.svg)](https://codecov.io/gh/anyres/core)
[![CircleCI](https://circleci.com/gh/anyres/core.svg?style=svg)](https://circleci.com/gh/anyres/core)

@anyres/core is an abstract common library which uses `IHttpAdapter` to make requests, so it's even possible to use the lib on node.js server side with typescript. You just need to implement a `IHttpAdapter` for it.

Anyres inspired by [`ngx-resource`](https://github.com/troyanskiy/ngx-resource-core).

## Known IHttpAdapter

* [`@anyres/wepy-adapter`](https://github.com/anyres/wepy-adapter). Based on `wepy.request` from `wepy`.
* [`@anyres/axios-adapter`](https://github.com/anyres/axios-adapter). Based on `axios`. 
* [`@anyres/ng-anyres`](https://github.com/anyres/ng-anyres). Based on `HttpClient` from `@angular/common/http`.

## Mock tool for angular

* [`@anyres/mock-restful`](https://github.com/anyres/mock-restful).

## Documents
[https://anyres.github.io/core/](https://anyres.github.io/core/)
