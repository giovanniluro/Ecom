import React from 'react'
import styles from './index.module.scss';
import { Products } from '../../interfaces';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useRouter } from 'next/router';

SwiperCore.use([Navigation, Pagination]);

interface ShowcaseProps {
  products: Array<Products>;
  title: string;
}

export default function Showcase({ products, title }: ShowcaseProps) {
  const router = useRouter();
  var goToProduct = (id: number, e) => {
    e.preventDefault();
    router.push(`/product/${id}`);
  }

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className="showcase">
        <Swiper navigation={true} loop={true} breakpoints={{
          "1024": {
            "slidesPerView": 4,
            "spaceBetween": 50
          }
        }}>
          {products && products.map(item => {
            return (
              <SwiperSlide key={item.id} >
                <div className={styles.card}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                  <p>{new Intl.NumberFormat('en-US', {
                    currency: "USD",
                    style: "currency"
                  }).format(item.price)}</p>
                  <div>
                    <a href={`/product/${item.id}`} onClick={(e) => goToProduct(item.id, e)}>Shop Now</a>
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
