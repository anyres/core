# @anyres/core
@anyres/core is an abstract common library which uses `IHttpAdapter` to make requests, so it's even possible to use the lib on node.js server side with typescript. You just need to implement a `IHttpAdapter` for it.

Anyres inspired by [`ngx-resource`](https://github.com/troyanskiy/ngx-resource-core).

### Known IHttpAdapter

* [`@anyres/wepy-adapter`](https://github.com/anyres/wepy-adapter). Based on `wepy.request` from `wepy`.
* [`@anyres/axios-adapter`](https://github.com/anyres/axios-adapter). Based on `axios`. 
* [`@anyres/angular-http-client-adapter`](https://github.com/anyres/angular-http-client-adapter). Based on `HttpClient` from `@angular/common/http`.

## Documents
[https://anyres.github.io/core/](https://anyres.github.io/core/)