import React, { useEffect } from 'react'
import { useCart } from '../../contexts/CartContext';
import styles from './index.module.scss';

export default function Cart() {
  const { products, setProducts } = useCart();

  useEffect(() => {
    console.log(products)
  }, [products]);

  return (
    <div className={styles.cartContainer}>
      <h2>Cart</h2>
      <button onClick={() => setProducts([])}></button>
      <div className={styles.cartList}>
        <p>what</p>
        {products.map(item => {
          return (
            <p key={item.product.id}>{item.product.title}</p>
          )
        })}
      </div>
    </div>
  )
}
