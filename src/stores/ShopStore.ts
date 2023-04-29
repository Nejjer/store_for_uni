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
  private _onlyFavorites = false;
  private _sortField: keyof IProduct = 'title';
  public categories: string[] = [];
  private _favoriteItems: number[] = [];
  private filterCategory: string | undefined = undefined;

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
      this.applyConstrains();
    });
  }

  public set onlyFavorites(flag: boolean) {
    this._onlyFavorites = flag;
    this.applyConstrains();
  }

  public get onlyFavorites() {
    return this._onlyFavorites;
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
    this.applyConstrains();
  }

  private sort(array: IProduct[], isDesc: boolean, sortField: keyof IProduct) {
    return isDesc
      ? utils.sortDesc(array.slice(), sortField)
      : utils.sortAsc(array.slice(), sortField);
  }

  private async fetchCategories() {
    const response = (await axiosInstance.get<string[]>('products/categories'))
      .data;
    runInAction(() => {
      this.categories = response;
    });
  }

  public filterByCategory(category: string) {
    this.filterCategory = category;
    this.applyConstrains();
  }
  public clearFilter() {
    this.filterCategory = undefined;
    this.applyConstrains();
  }

  public revertSort() {
    this.descSort = !this.descSort;
    this.applyConstrains();
  }

  private applyConstrains() {
    let applyingArray = this.allProducts.slice();
    applyingArray = this.sort(applyingArray, this.descSort, this._sortField);
    if (this.filterCategory)
      applyingArray = applyingArray.filter(
        ({ category }) => category === this.filterCategory
      );
    if (this.onlyFavorites)
      applyingArray = applyingArray.filter(({ id }) =>
        this.favoriteItems.includes(id)
      );
    this.filteredProduct = applyingArray;
  }
}
