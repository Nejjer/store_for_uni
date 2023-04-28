import { makeAutoObservable, runInAction } from 'mobx';
import { axiosInstance } from '../axios';
import { utils } from '../utils/utils';

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
  private descSort = false;
  private _sortField: keyof IProduct = 'title';
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
      this.sort();
    });
  }

  public clearFilter() {
    this.filteredProduct = this.allProducts.slice();
    this.sort();
  }

  public set sortField(field: keyof IProduct) {
    this._sortField = field;
    this.sort();
  }

  private sort() {
    this.filteredProduct = this.descSort
      ? utils.sortDesc(this.filteredProduct.slice(), this._sortField)
      : utils.sortAsc(this.filteredProduct.slice(), this._sortField);
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
    this.sort();
  }

  public revertSort() {
    this.descSort = !this.descSort;
    this.sort();
  }
}
