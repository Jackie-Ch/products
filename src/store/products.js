import { makeAutoObservable } from "mobx";
import { getProducts } from "../api/api";

class Products {
  products = [];
  basket = [];
  activeColor = 1;
  activeSize = 0;
  tableSizes = [
    { id: 1, label: "XS", number: 44 },
    { id: 2, label: "S", number: 46 },
    { id: 3, label: "M", number: 48 },
    { id: 4, label: "L", number: 50 },
    { id: 5, label: "XL", number: 52 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  getProducts() {
    getProducts().then(
      (products) => (this.products = [...this.products, ...products])
    );
  }

  handleActiveColor(id) {
    this.activeColor = id;
  }

  handleActiveSize(size) {
    this.activeSize = size;
  }

  handleBtnOfBuy(id, image, price, color, productCategory) {
    if (this.activeSize) {
      this.basket = [
        ...this.basket,
        {
          id: Date.now(),
          productID: id,
          productName: productCategory,
          color: color,
          images: image,
          price: price,
          size: this.activeSize,
        },
      ];
    }
  }

  handleDeleteProduct(id) {
    this.basket = this.basket.filter((product) => product.id !== id);
  }
}

export default new Products();
