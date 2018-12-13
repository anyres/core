import { Observable } from "rxjs";
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
  headers: any;
  body: any;
  json: () => {
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
