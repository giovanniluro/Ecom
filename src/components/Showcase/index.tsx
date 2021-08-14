import React from 'react'
import styles from './index.module.scss';
import { Products } from '../../interfaces';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useRouter } from 'next/router';

SwiperCore.use([Navigation, Pagination])


interface ShowcaseProps {
  products: Array<Products>;
  title: string;
  id: string;
}

export default function Showcase({ products, id, title }: ShowcaseProps) {
  const router = useRouter();
  var goToProduct = (id: number) => {
    router.push(`/product/${id}`);
  }
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className="showcase">
        <Swiper navigation={true} slidesPerView={4} loop={true}>
          {products.map(item => {
            return (
              <SwiperSlide key={item.id} >
                <div className={styles.card} id={id}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                  <p>{new Intl.NumberFormat('en-US', {
                    currency: "USD",
                    style: "currency"
                  }).format(item.price)}</p>
                  <div>
                    <a onClick={() => goToProduct(item.id)}>Shop Now</a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
          }
        </Swiper>

      </div>
    </div>
  )
}
