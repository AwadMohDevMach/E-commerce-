import isString  from "./gaurds";
export type TLoading = "idle" | "pending" | "succeeded" | "failed";
export type TCategory = {
  id?: number;
  title: string;
  prefix: string;
  img: string;
};
export type TProducts = {
  id:number;
  title:string;
  price?:number;
  cat_prefix?: string;
  img:string;
  quantity:number;
  max?:number;
  isAuthnticated?: boolean;
};
export {isString}
