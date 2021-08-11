import React from 'react';
import style from './index.module.scss';

interface HeaderProps {
  categories: Array<string>;
}

export default function Header({ categories }: HeaderProps) {
  return (
    <div className={style.header}>
      <div className={style.crumb}>
        <h1>Ecom</h1>
        <a>Home</a>
        {categories.map(category => (<a key={category}>{category}</a>))}
      </div>
      <div>
      </div>
    </div>
  )
}
