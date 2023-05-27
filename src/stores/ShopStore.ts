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

export interface ICartItem {
  id: number;
  count: number;
}

const FAVORITE_ITEM_LS_KEY = 'favoriteItem';
const CART_ITEMS_LS_KEY = 'cart';

export class ShopStore {
  private allProducts: IProduct[] = [];
  public filteredProduct: IProduct[] = [];
  private descSort = false;
  private _onlyFavorites = false;
  private _cart: ICartItem[] = [];
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
    this._cart = JSON.parse(localStorage.getItem(CART_ITEMS_LS_KEY) || '[]');
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

  public get favoriteItems(): number[] {
    return this._favoriteItems;
  }

  private set cart(cards: ICartItem[]) {
    this._cart = [...new Set(cards)];
    localStorage.setItem(CART_ITEMS_LS_KEY, JSON.stringify(cards));
  }

  public get cart() {
    return this._cart;
  }

  public addToFavorite(id: number) {
    this.favoriteItems.push(id);
    this.favoriteItems = this.favoriteItems.slice();
  }

  public addToCart(id: number) {
    const cartItem = this.cart.findIndex((item) => item.id === id);
    if (cartItem !== -1) {
      this.cart[cartItem].count++;
    } else {
      this.cart.push({ count: 1, id });
    }
    this.cart = this.cart.slice();
  }

  public removeFromCart(id: number) {
    const cartItem = this.getItemFromCart(id);
    if (cartItem && cartItem.count === 1) {
      this.cart = this.cart.filter((cart) => cart.id !== id);
    } else {
      cartItem && cartItem.count--;
    }
  }

  public isContainInCard(id: number) {
    return !!this._cart.find((item) => item.id === id);
  }

  public getItemFromCart(id: number) {
    return this.cart.find((item) => item.id === id);
  }

  public deleteFavorite(id: number) {
    this.favoriteItems = this.favoriteItems.filter((item) => item !== id);
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
