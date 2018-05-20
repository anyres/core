
import { Observable, ObservableInput, of as observableOf, throwError as observableThrowError } from "rxjs";

import { catchError, map, switchMap } from "rxjs/operators";
import { IHttpAdapter } from "./HttpAdapter";

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

export enum HttpMethod {
  Create = "create",
  Get = "get",
  Update = "update",
  Remove = "remove",
  Query = "query",
}

export interface IAnyresParams {
  path: string;
  httpAdapterStatic?: IHttpAdapter;
  forbiddenMethods?: HttpMethod[];
}

export class AnyresCRUD<
  TQ extends IResQuery,
  TQR extends IResQueryResult,
  TG extends IResGet,
  TC extends IResCreate,
  TU extends IResUpdate
  > {
  public path: string;
  public httpAdapterStatic: IHttpAdapter;
  public forbiddenMethods: HttpMethod[];

  constructor(
    private httpAdapter?: IHttpAdapter,
    private errorHandler?: (err: any, caught: Observable<any>) => ObservableInput<any>,
  ) {
    if (!this.httpAdapter) {
      this.httpAdapter = this.httpAdapterStatic;
    }
    if (!this.errorHandler) {
      this.errorHandler = (err: any, caught: Observable<any>) => {
        return caught;
      };
    }
    this.forbiddenMethods.forEach((method) => {
      this[method] = () => {
        return observableThrowError(new Error(`${method} method forbidden`));
      };
    });
  }

  public create(res: TC): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.post(`${this.path}`, {
          body: res,
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public get(id): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}/${id}`, {
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public update(res: TU): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.patch(`${this.path}/${res.id}`, {
          body: res,
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public remove(id: string | number): Observable<any> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.delete(`${this.path}/${id}`, {
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public query(query?: TQ): Observable<TQR> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}`, {
          params: query || {},
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public next(url: string): Observable<TQR> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${url}`, {
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public previous(url: string): Observable<TQR> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${url}`, {
          headers,
        });
      }),
      map((response) => response.json()),
      catchError(this.errorHandler),
    );
  }

  public getHeaders$(): Observable<{
    [key: string]: string,
  }> {
    return observableOf({
      "Content-type": "application/json",
    });
  }
}
