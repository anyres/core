import { IAnyresParams } from "./Interface";
export function Anyres(params: IAnyresParams) {
  return (target: any) => {
    target.prototype.httpAdapterStatic = params.httpAdapterStatic;
    target.prototype.path = params.path;
  };
}
