import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "@store/index";


const getCartTotalQuantitySelector = createSelector(
    (state: RootState)=>{return state.cart.item},
    (items) => {    
        const totalQuntity = Object.values(items).reduce((acc , curr) => {
            return acc + curr
          },0)
          return totalQuntity;
    }
)

export  {getCartTotalQuantitySelector}