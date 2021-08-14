import React from 'react';
import { useRouter } from 'next/router';
import style from './index.module.scss';

interface HeaderProps {
  categories: Array<string>;
}

export default function Header({ categories }: HeaderProps) {
  const router = useRouter();

  var handleGoToHome = () => {
    router.push('/');
  }
  return (
    <div className={style.header}>
      <div className={style.crumb}>
        <h1 onClick={handleGoToHome}>Ecom</h1>
        {categories.map(category => (<a href={`${category.replace(/\s|\W/g, '')}`} key={category}>{category}</a>))}
      </div>
      <div>
      </div>
    </div >
  )
}
