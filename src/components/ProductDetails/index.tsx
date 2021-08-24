import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CartContext } from '../../contexts/CartContext';
import { Products } from '../../interfaces'
import styles from './index.module.scss';

interface ProductProps {
  data: Products;
}

export default function ProductDetails({ data }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const { products, setProducts } = useContext(CartContext);

  var handleAddQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity, setQuantity]);

  var handleRemoveQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }, [quantity, setQuantity]);

  var handleAddToCart = useCallback(() => {
    var productInCart = false;

    var updatedProducts = products.map((item) => {
      if (item.product.id === data.id) {
        productInCart = true;
        return { product: item.product, quantity: item.quantity + quantity }
      }
      return item;
    });

    if (!productInCart) { setProducts([...updatedProducts, { product: data, quantity: quantity }]) }
    else {
      setProducts(updatedProducts);
    }
  }, [products, setProducts, data, quantity]);


  useEffect(() => {
    setQuantity(1);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.productImage}>
        <img src={data.image} alt={data.title} />
      </div>
      <div className={styles.productData}>
        <h1>{data.title}</h1>
        <div className={styles.tagsContainer}>
          <span className={styles.tags}>Category</span><span>{data.category}</span>
          <span className={styles.tags}>ID</span><span>{data.id}</span>
        </div>

        <p className={styles.productDescription}>{data.description}</p>
        <p className={styles.productPrice}>{new Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency'
        }).format(data.price)}</p>
        <div className={styles.actionContainer}>
          <div className={styles.quantityContainer}>
            <button onClick={handleRemoveQuantity}>-</button>
            <span>
              {quantity}
            </span>
            <button onClick={handleAddQuantity}>+</button>
          </div>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
