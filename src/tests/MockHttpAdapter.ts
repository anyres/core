import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { IAnyresRequestOptions, IAnyresResponse, IHttpAdapter } from "..";

export class MockHttpAdapter implements IHttpAdapter {
  public get(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return Observable.of({
      json: () => {
        return {
          id: 1,
          title: "title",
        };
      },
    });
  }
  public post(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return Observable.of({
      json: () => {
        return {
          id: 2,
          ...options.body,
        };
      },
    });
  }
  public put(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return Observable.of({
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
  public delete(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return Observable.of({
      json: () => {
        return {};
      },
    });
  }
  public patch(url: string, options?: IAnyresRequestOptions): Observable<IAnyresResponse> {
    return Observable.of({
      json: () => {
        return {
          ...options.body,
        };
      },
    });
  }
}

// test("mock HttpAdapter", () => {
//   const httpAdapterStatic = new MockHttpAdapter();
//   return httpAdapterStatic.get("").toPromise().then((data) => {
//     expect(data.json().title).toBe("title");
//   });
// });
