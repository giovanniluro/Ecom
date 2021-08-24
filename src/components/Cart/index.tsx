import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext';
import styles from './index.module.scss';

export default function Cart() {
  const { products, setProducts } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadCartInLocalStorage();
  }, []);

  useEffect(() => {
    saveCartInLocalStorage();
    calculateCartTotal();
    handleCartMotion();
  }, [products]);

  const goToCheckout = () => {
    router.push('/checkout');
  }

  const handleAddQuantity = useCallback(id => {
    const newProductsArray = products.map(product => {
      if (product.product.id === id) {
        return { product: product.product, quantity: product.quantity + 1 };
      }
      return product;
    });

    setProducts(newProductsArray);
  }, [products]);

  const handleCartMotion = useCallback(() => {
    if (products.length) {
      setOpenCart(true);
    }
    else {
      setOpenCart(false);
    }
  }, [products]);

  const calculateCartTotal = useCallback(() => {
    var total = products.reduce((acc, item) => acc += item.quantity * item.product.price, 0);
    setCartTotal(total);
  }, [products]);

  const handleRemoveQuantity = useCallback(id => {
    const newProductsArray = products.map(product => {
      if (product.product.id === id) {
        return { product: product.product, quantity: product.quantity - 1 };
      }
      return product;
    });

    const filterRemovedProducts = newProductsArray.filter(product => product.quantity > 0);
    setProducts(filterRemovedProducts);
  }, [products]);

  const saveCartInLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(products));
  }

  const loadCartInLocalStorage = () => {
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    if (cart) {
      setProducts(cart);
    }
  }

  return (
    <div>
      <button onClick={() => setOpenCart(!openCart)}>Cart</button>
      <div className={`${styles.cartContainer} ${openCart ? styles.cartOpen : styles.cartClosed}`}>
        <div>
          <div className={styles.cartHeading}>
            <h2>Cart</h2>
            <button onClick={() => setOpenCart(!openCart)}>x</button>
          </div>
          <button onClick={() => setProducts([])}></button>
          <div className={styles.cartList}>
            {products.map(item => {
              return (
                <div className={styles.productCard} key={item.product.id}>
                  <div>
                    <img src={item.product.image} alt={item.product.title} />
                  </div>
                  <div >
                    <div className={styles.productInfo}>
                      <p className={styles.cartTitle}>{item.product.title}</p>
                      <div className={styles.actionContainer}>
                        <div className={styles.quantityContainer}>
                          <button onClick={() => handleRemoveQuantity(item.product.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleAddQuantity(item.product.id)}>+</button>
                        </div>
                        <p>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div>
            <p>Total: </p>
            <p>{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(cartTotal)}</p>
          </div>
          <button onClick={goToCheckout} className={styles.buyButton}>Comprar</button>
        </div>
      </div>
    </div>
  );
}
