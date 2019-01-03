
import { Observable, of, throwError } from "rxjs";
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
  primaryKey?: string;
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
  public primaryKey: string;
  public path: string;
  public httpAdapterStatic: IHttpAdapter;
  public forbiddenMethods: HttpMethod[];

  constructor(
    public httpAdapter?: IHttpAdapter,
    public errorHandler?: (err: any) => void,
  ) {
    if (!this.httpAdapter) {
      this.httpAdapter = this.httpAdapterStatic;
    }
    if (!this.errorHandler) {
      this.errorHandler = (err: any) => {
        console.log(err);
      };
    }
    this.forbiddenMethods.forEach((method) => {
      this[method] = () => {
        return throwError(new Error(`${method} method forbidden`));
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
      map((response) => response.json() as TG),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public get(id): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.get(`${this.path}/${id}`, {
          headers,
        });
      }),
      map((response) => response.json() as TG),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public update(res: TU): Observable<TG> {
    return this.getHeaders$().pipe(
      switchMap((headers) => {
        return this.httpAdapter.patch(`${this.path}/${res[this.primaryKey]}`, {
          body: res,
          headers,
        });
      }),
      map((response) => response.json() as TG),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
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
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
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
      map((response) => response.json() as TQR),
      catchError((err: any) => {
        this.errorHandler(err);
        return throwError(err);
      }),
    );
  }

  public getHeaders$(): Observable<{
    [key: string]: string,
  }> {
    return of({
      "Content-type": "application/json",
    });
  }
}
