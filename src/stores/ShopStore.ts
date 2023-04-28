import { makeAutoObservable, runInAction } from 'mobx';
import { axiosInstance } from '../axios';

export interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export class ShopStore {
  private allProducts: IProduct[] = [];
  public filteredProduct: IProduct[] = [];
  public categories: string[] = [];

  constructor() {
    this.fetchProduct();
    this.fetchCategories();
    makeAutoObservable(this);
  }

  private async fetchProduct() {
    const response = (await axiosInstance.get<IProduct[]>('products')).data;
    runInAction(() => {
      this.allProducts = response;
      this.filteredProduct = response;
    });
  }

  private async fetchCategories() {
    const response = (await axiosInstance.get<string[]>('products/categories'))
      .data;
    runInAction(() => {
      this.categories = response;
    });
  }

  public filterByCategory(category: string) {
    this.filteredProduct = this.allProducts.filter(
      (product) => product.category === category
    );
  }

  public sortByName() {
    this.filteredProduct = this.sortDesc(this.allProducts.slice(), 'title');
  }

  public sortByPrice() {
    this.filteredProduct = this.sortDesc(this.allProducts.slice(), 'price');
  }

  private sortDesc<T>(arr: T[], field: keyof T) {
    return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
  }
}
