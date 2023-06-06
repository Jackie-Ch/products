import { observer } from 'mobx-react-lite';
import Products from '../store/products';
import style from './Basket.module.css';
import { Link } from 'react-router-dom';

export const Basket = observer(() => {
  const tableSize = Products.tableSizes;
  if (!Products.basket.length)
    return (
      <>
        <div className={style.emptyBasketMessage}>корзина пуста</div>
        <Link to="/products" className={style.toHomeBtn}>
          вернуться в магазин
        </Link>
      </>
    );
  return (
    <>
      <div className={style.totalPrice}>
        Total price:{' '}
        {Products.basket.reduce(
          (acc, product) => Number(product.price) + acc,
          0
        )}
      </div>
      <Link to="/products" className={style.backToProductsBtn}>
        вернуться к покупкам
      </Link>
      <ul className={style.productList}>
        {Products.basket.map((product) => (
          <li className={style.productItem} key={product.id}>
            <img src={product.images} width={50} />
            <div>
              <div>товар: {product.productName}</div>
              <div>цвет: {product.color}</div>
              <div>цена: {product.price}</div>
              <div>
                размер:{' '}
                {tableSize
                  .filter((size) => size.id === product.size)
                  .map((s) => s.label)}
              </div>
            </div>
            <button
              className={style.deleteProductBtn}
              onClick={() => Products.handleDeleteProduct(product.id)}
            >
              удалить
            </button>
          </li>
        ))}
      </ul>
    </>
  );
});
