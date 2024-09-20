import { TProducts } from "./shared"

export type TorderItem = {
    id : number,
    items : TProducts[],
    subtotal :number;
}