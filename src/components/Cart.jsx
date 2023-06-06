import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Products from '../store/products';
import { observer } from 'mobx-react-lite';
import style from './Cart.module.css';

export const Cart = observer(() => {
  const tableSizes = Products.tableSizes;
  const activeColor = Products.activeColor;
  const activeSize = Products.activeSize;

  const { id } = useParams();
  const imgRef = useRef();

  const item = Products.products.find((product) => product.id === Number(id));

  const handleMouseOverOnImg = (event, images) => {
    if (event._reactName === 'onMouseOver') {
      imgRef.current.src = images[1];
    } else if (event._reactName === 'onMouseLeave') {
      imgRef.current.src = images[0];
    }
  };

  if (!item) return <h3>Loading...</h3>;

  return (
    <div className={style.wrapper}>
      <Link to="/products" className={style.backBtn}>
        назад
      </Link>

      {item.colors
        .filter((color) => color.id === activeColor)
        .map((color) => (
          <div className={style.cart} key={color.id}>
            <img
              ref={imgRef}
              onMouseOver={(event) => handleMouseOverOnImg(event, color.images)}
              onMouseLeave={(event) =>
                handleMouseOverOnImg(event, color.images)
              }
              className={style.cartImage}
              key={color.id}
              src={color.images[0]}
              width={150}
            />
            <div>цена: {color.price}</div>
            <div>описание: {color.description.slice(12)}</div>
            <div className={style.wrapperColorBtn}>
              цвет:
              {item.colors.map((color) => (
                <button
                  className={
                    color.id === activeColor
                      ? `${style.colorBtn} ${style.active}`
                      : style.colorBtn
                  }
                  key={color.id}
                  onClick={() => Products.handleActiveColor(color.id)}
                >
                  {color.name}
                </button>
              ))}
            </div>
            <div className={style.wrapperColorBtn}>
              размер:
              {color.sizes.length ? (
                color.sizes.map((size) => {
                  return tableSizes
                    .filter((tableSize) => tableSize.id === size)
                    .map((s) => (
                      <button
                        className={
                          size === activeSize
                            ? `${style.sizeBtn} ${style.active}`
                            : style.sizeBtn
                        }
                        key={s.id}
                        onClick={() => Products.handleActiveSize(size)}
                      >
                        {s.label}
                      </button>
                    ));
                })
              ) : (
                <span>Товар отсутствует</span>
              )}
            </div>
            <button
              className={style.buyBtn}
              onClick={() =>
                Products.handleBtnOfBuy(
                  color.id,
                  color.images[0],
                  color.price,
                  color.name,
                  item.name
                )
              }
              disabled={!color.sizes.length}
            >
              купить
            </button>
          </div>
        ))}
    </div>
  );
});
