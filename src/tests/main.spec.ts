import { Observable, of as observableOf } from "rxjs";
import { Anyres, AnyresCRUD, IAnyresRequestOptions, IAnyresResponse, IHttpAdapter } from "..";
import { HttpMethod } from "../AnyresCRUD";

class MockHttpAdapter implements IHttpAdapter {
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


export interface IPostQuery {
}
export interface IPostQueryResult {
}
export interface IPostGet {
  id?: number;
  title?: string;
}
export interface IPostCreate {
}
export interface IPostUpdate {
  id: string | number;
  title?: string;
}

// tslint:disable-next-line:max-classes-per-file
@Anyres({
  path: "http://localhost:3000/posts",
  httpAdapterStatic: new MockHttpAdapter(),
  forbiddenMethods: [
    HttpMethod.Query,
  ],
})
class TestRes extends AnyresCRUD<
IPostQuery,
IPostQueryResult,
IPostGet,
IPostCreate,
IPostUpdate
> {

}

describe("test MockAdapter", () => {
  const testRes = new TestRes();

  test("create", () => {
    return testRes.create({
      title: "new title",
    }).toPromise().then((data) => {
      expect(data.id).toBe(2);
      expect(data.title).toBe("new title");
    });
  });
  test("get", () => {
    return testRes.get(1).toPromise().then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe("title");
    });
  });
  test("update", () => {
    return testRes.update({
      id: 1,
      title: "change title",
    }).toPromise().then((data) => {
      expect(data.id).toBe(1);
      expect(data.title).toBe("change title");
    });
  });
  test("remove", () => {
    return testRes.remove(1).toPromise().then((data) => {
      expect(data).toEqual({});
    });
  });
  test("query", () => {
    return testRes.query().toPromise().then(null, (e) => {
      expect(e.message).toBe(`query method forbidden`);
    });
  });
});
