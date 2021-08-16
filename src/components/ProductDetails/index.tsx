import React, { useState } from 'react'
import { Products } from '../../interfaces'
import styles from './index.module.scss';

interface ProductProps {
  data: Products;
}

export default function ProductDetails({ data }: ProductProps) {
  const [quantity, setQuantity] = useState(1);

  var handleAddQuantity = () => {
    setQuantity(quantity + 1);
  }

  var handleRemoveQuantity = (a) => {
    console.log(a);
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

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
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
