import { GetServerSideProps } from 'next';
import React, { useState } from 'react'
import api from '../../api';
import Showcase from '../../components/Showcase';
import ProductDetails from '../../components/ProductDetails';
import { Products } from '../../interfaces';

interface ProductProps {
  product: Products;
  relatedProducts: Array<Products>
}

export default function Product({ product, relatedProducts }: ProductProps) {
  return (
    <>
      <ProductDetails data={product} />
      {relatedProducts && <Showcase products={relatedProducts} title="You may also like" />}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const product = await api.get(`/products/${query.id}`);
  const relatedProducts = await api.get(`/products/category/${product.data.category}`);

  return {
    props: {
      product: product.data,
      relatedProducts: relatedProducts.data
    }
  }
}
