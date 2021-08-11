import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { GetServerSideProps } from 'next';
import api from '../api';
import { Products } from '../interfaces';
import HomeSlider from '../components/HomeSlider';

interface HomeProps {
  categories: Array<string>;
  products: Array<Products>;
}

export default function Home({ categories }: HomeProps) {
  return (
    <>
      <Head >
        <title>Ecom | Home</title>
      </Head>
      <Header categories={categories} />
      <HomeSlider />

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await api.get('/products/categories');
  const products = await api.get('/products');

  return {
    props: {
      categories: categories.data,
      products: products.data
    }
  }
};