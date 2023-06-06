import { Link } from 'react-router-dom';
import style from './Header.module.css';
import Products from '../store/products';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  return (
    <header className={style.header}>
      <Link to="/products">
        <img className={style.logo} />
      </Link>
      <Link to="/basket" className={style.basketWrapper}>
        <div>{Products.basket.length}</div>
        <img className={style.basket} src="/shopping-cart.png" alt="basket" />
      </Link>
    </header>
  );
});
