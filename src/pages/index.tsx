import React from 'react';
import styles from '../styles/home.module.css';
import Head from 'next/head';
import Header from '../components/Header';
import { GetServerSideProps } from 'next';
import api from '../api';

interface HomeProps {
  user: any;
}


export default function Home({ user }: HomeProps) {
  return (
    <>
      <Head >
        <title>Ecom | Home</title>
      </Head>
      <Header />
      <h1 className={styles.title}>{user.name.firstname}</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/users/2');
  return {
    props: {
      user: data
    }
  }
};