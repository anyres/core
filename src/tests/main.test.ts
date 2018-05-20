import { from, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import {
  Anyres,
  AnyresCRUD,
  IResCreate,
  IResGet,
  IResQuery,
  IResQueryResult,
  IResUpdate,
} from "..";
import { MockHttpAdapter } from "./MockHttpAdapter";

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

@Anyres({
  path: "http://localhost:3000/posts",
  httpAdapterStatic: new MockHttpAdapter(),
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
});
