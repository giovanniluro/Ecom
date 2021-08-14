import React from 'react'
import styles from './index.module.scss';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Autoplay])

export default function HomeSlider() {
  return (
    <div id="homeBanner">
      <Swiper autoplay={{
        "delay": 4000,
        "disableOnInteraction": false
      }} navigation={true} loop={true}>
        <SwiperSlide className={styles.homeBannerBlack}>
          <p>E COM</p>
          <p> The new concept of shopping</p>
        </SwiperSlide>
        <SwiperSlide className={styles.homeBannerBlack}>
          <p>SALES</p>
          <p>Check it out now</p>
        </SwiperSlide>
        <SwiperSlide className={styles.homeBannerBlack}>
          <p>FOLLOW US</p>
          <p>On social media</p>
        </SwiperSlide>
      </ Swiper>
    </div>
  )
}
