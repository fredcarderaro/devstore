'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface CartItem {
  productId: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  // Cria estado com os itens do carrinho
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Função para adicionar itens ao carrinho
  function addToCart(productId: number) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId)

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity }
          } else {
            return item
          }
        })
      } else {
        return [...state, { productId, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {/* Children poderá ser server component. */}
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
