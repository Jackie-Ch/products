import { Link } from 'react-router-dom';
import style from './Home.module.css';
import Products from '../store/products';
import { observer } from 'mobx-react-lite';

export const Home = observer(() => {
  const shirt = Products.products.find((product) => product.id === 1);
  const singlet = Products.products.find((product) => product.id === 2);

  if (!shirt && !singlet)
    return <h3 style={{ textAlign: 'center' }}>Loading...</h3>;

  return (
    <div className={style.product_list}>
      <Link to={`/products/${shirt.id}`} className={style.product_item}>
        <img
          className={style.product_image}
          src={shirt.colors[0].images[0]}
          alt="shirt"
        />
        <div className={style.product_name}>{shirt.name}</div>
      </Link>
      <Link to={`/products/${singlet.id}`} className={style.product_item}>
        <img
          className={style.product_image}
          src={singlet.colors[0].images[0]}
          alt="singlet"
        />
        <div className={style.product_name}>{singlet.name}</div>
      </Link>
    </div>
  );
});
