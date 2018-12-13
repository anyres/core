import { Observable, of as observableOf } from "rxjs";
import { IAnyresRequestOptions, IAnyresResponse, IHttpAdapter } from "..";

export class MockHttpAdapter implements IHttpAdapter {
  public get(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        id: 1,
        title: "title",
      },
      json: () => {
        return {
          id: 1,
          title: "title",
        };
      },
    });
  }
  public post(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 201,
      headers: {},
      body: {
        id: 2,
        ...options.body,
      },
      json: () => {
        return {
          id: 2,
          ...options.body,
        };
      },
    });
  }
  public put(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        ...options.body,
      },
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
  public delete(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 204,
      headers: {},
      body: {},
      json: () => {
        return {};
      },
    });
  }
  public patch(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return observableOf({
      status: 200,
      headers: {},
      body: {
        ...options.body,
      },
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
}
