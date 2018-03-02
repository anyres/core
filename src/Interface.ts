import { Observable } from "rxjs";

export interface IResQuery {
}
export interface IResQueryResult {
}
export interface IResGet {
}
export interface IResCreate {
}
export interface IResUpdate {
  id: string | number;
}

export interface IAnyresParams {
  path: string;
  httpAdapter?: IHttpAdapter;
}

export interface IAnyresRequestOptions {
  body?: {
    [key: string]: any,
  };
  headers?: {
    [key: string]: string;
  };
  params?: {
    [key: string]: any;
  };
}

export interface IAnyresResponse {
  status: number;
  headers?: any;
  body?: any;
  json?: () => {
    [key: string]: any,
  };
}

export interface IHttpAdapter {

  get(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse>;

  post(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse>;

  put(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse>;

  delete(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse>;

  patch(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse>;

}
