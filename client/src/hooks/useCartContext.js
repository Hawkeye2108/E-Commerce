import { CartContext } from "../context/cartContext";
import { useContext } from "react";

export const useCartContext = ()=>{
    return useContext(CartContext);
}