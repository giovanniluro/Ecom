import React from 'react'
import dynamic from 'next/dynamic';
import '@brainhubeu/react-carousel/lib/style.css';

const Carousel = dynamic(
  () => import('@brainhubeu/react-carousel'),
  {
    ssr: false
  }
)

export default function HomeSlider() {
  return (
    <Carousel plugins={[
      'infinite',
      'arrows'
    ]}>
      <div>
        TESTE
      </div>
      <div>
        TESTE 2
      </div>
    </Carousel>
  )
}
