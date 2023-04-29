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

const FAVORITE_ITEM_LS_KEY = 'favoriteItem';

export class ShopStore {
  private allProducts: IProduct[] = [];
  public filteredProduct: IProduct[] = [];
  private descSort = false;
  private _sortField: keyof IProduct = 'title';
  public categories: string[] = [];
  private _favoriteItems: number[] = [];

  constructor() {
    this.fetchProduct();
    this.fetchCategories();
    this._favoriteItems = JSON.parse(
      localStorage.getItem(FAVORITE_ITEM_LS_KEY) || '[]'
    );
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

  private set favoriteItems(favorites: number[]) {
    this._favoriteItems = [...new Set(favorites)];
    localStorage.setItem(
      FAVORITE_ITEM_LS_KEY,
      JSON.stringify(this._favoriteItems)
    );
  }

  public addToFavorite(id: number) {
    this.favoriteItems.push(id);
    this.favoriteItems = this.favoriteItems.slice();
  }

  public deleteFavorite(id: number) {
    this.favoriteItems = this.favoriteItems.filter((item) => item !== id);
  }

  public get favoriteItems(): number[] {
    return this._favoriteItems;
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
