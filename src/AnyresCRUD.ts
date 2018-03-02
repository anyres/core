import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { ObservableInput } from "rxjs/Observable";

import {
  IHttpAdapter,
  IResCreate,
  IResGet,
  IResQuery,
  IResQueryResult,
  IResUpdate,
} from "./Interface";

export class AnyresCRUD<
  TQ extends IResQuery,
  TQR extends IResQueryResult,
  TG extends IResGet,
  TC extends IResCreate,
  TU extends IResUpdate
  > {
  public path: string;
  public httpAdapter: IHttpAdapter;

  constructor(
    private http?: IHttpAdapter,
    private errorHandler?: (err: any, caught: Observable<any>) => ObservableInput<any>,
  ) {
    if (!this.http) {
      this.http = this.httpAdapter;
    }
    if (!this.errorHandler) {
      this.errorHandler = (err: any, caught: Observable<any>) => {
        return caught;
      };
    }
  }

  public create(res: TC): Observable<TG> {
    return this.http.post(`${this.path}`, {
      body: res,
    })
      .map((response) => response.json())
      .catch(this.errorHandler);
  }

  public get(id): Observable<TG> {
    return this.http.get(`${this.path}/${id}`)
      .map((response) => response.json())
      .catch(this.errorHandler);
  }

  public update(res: TU): Observable<TG> {
    return this.http.patch(`${this.path}/${res.id}`, {
      body: res,
    })
      .map((response) => response.json())
      .catch(this.errorHandler);
  }

  public remove(id: string | number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`)
      .map((response) => response.json())
      .catch(this.errorHandler);
  }

  public query(query?: TQ): Observable<TQR> {
    return this.http.get(`${this.path}`, {
      params: query || {},
    })
      .map((response) => response.json())
      .catch(this.errorHandler);
  }
}
