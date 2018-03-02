import { IAnyresParams } from "./Interface";
export function Anyres(params: IAnyresParams) {
  return (target: any) => {
    target.prototype.httpAdapter = params.httpAdapter;
    target.prototype.path = params.path;
    target.prototype.getResourceOptions = () => {
      return params;
    };
  };
}
