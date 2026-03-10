import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
    value: Product[],
    totalPrice: number

}

const initialState: CartState = {
    value: [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<Product>) => {
            state.value.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProductToCart } = cartSlice.actions

export default cartSlice.reducer