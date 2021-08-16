import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import api from '../api';
import { Products } from '../interfaces';
import HomeSlider from '../components/HomeSlider';
import Showcase from '../components/Showcase';

interface HomeProps {
  jewelery: Array<Products>;
  electronics: Array<Products>;
  mensClothing: Array<Products>;
  womensClothing: Array<Products>;
}

export default function Home({ jewelery, electronics, mensClothing, womensClothing }: HomeProps) {
  return (
    <>
      <Head >
        <title>Ecom | Home</title>
      </Head>
      <HomeSlider />
      {jewelery && <Showcase title="Jewelery" products={jewelery} />}
      {electronics && <Showcase title="Electronics" products={electronics} />}
      {mensClothing && <Showcase title="Men's Clothing" products={mensClothing} />}
      {womensClothing && <Showcase title="Women's Clothing" products={womensClothing} />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  var filterByCategory = (products: Array<Products>, category: string): Array<Products> => {
    return products.filter(product => product.category === category);

  }
  const { data } = await api.get("/products");
  const jewelery = filterByCategory(data, "jewelery");
  const electronics = filterByCategory(data, "electronics");
  const mensClothing = filterByCategory(data, "men's clothing");
  const womensClothing = filterByCategory(data, "women's clothing");
  return {
    props: {
      jewelery: jewelery,
      electronics: electronics,
      mensClothing: mensClothing,
      womensClothing: womensClothing
    }
  }
};