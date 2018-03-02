import { IAnyresParams } from "./AnyresCRUD";

export function Anyres(params: IAnyresParams) {
  return (target: any) => {
    target.prototype.path = params.path;
    target.prototype.httpAdapterStatic = params.httpAdapterStatic || null;
    target.prototype.forbiddenMethods = params.forbiddenMethods || [];
  };
}
