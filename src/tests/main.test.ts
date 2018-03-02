import { Observable } from "rxjs";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
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


