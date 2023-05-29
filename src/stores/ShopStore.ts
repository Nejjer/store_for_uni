import { makeAutoObservable, runInAction } from 'mobx';
import { axiosInstance } from '../axios';
import { utils } from '../utils/utils';
import { productApi } from '../api/ProductAPI';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface IProductDetailed extends IProduct {
  rating: {
    rate: number;
    count: number;
  };
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
  private _descSort = false;
  private _onlyFavorites = false;
  private _cart: ICartItem[] = [];
  private _sortField: keyof IProduct = 'title';
  public categories: string[] = [];
  private _favoriteIds: number[] = [];
  private _filterCategory: string | undefined = undefined;
  private _loading: boolean = false;

  constructor() {
    this.fetchProduct();
    this.fetchCategories();
    this._favoriteIds = JSON.parse(
      localStorage.getItem(FAVORITE_ITEM_LS_KEY) || '[]'
    );
    this._cart = JSON.parse(localStorage.getItem(CART_ITEMS_LS_KEY) || '[]');
    makeAutoObservable(this);
  }

  public get descSort() {
    return this._descSort;
  }

  public get filterCategory() {
    return this._filterCategory;
  }

  public getProductById(id: number) {
    return this.allProducts.find((item) => item.id === id);
  }

  private async fetchProduct() {
    runInAction(() => {
      this._loading = true;
    });
    const response = await productApi.getAllProduct();
    runInAction(() => {
      this.allProducts = response;
      this.filteredProduct = response;
      this._loading = false;
      this.applyConstrains();
    });
  }

  public get loading() {
    return this._loading;
  }

  public set onlyFavorites(flag: boolean) {
    this._onlyFavorites = flag;
    this.applyConstrains();
  }

  public get onlyFavorites() {
    return this._onlyFavorites;
  }

  private set favoriteIds(favorites: number[]) {
    this._favoriteIds = [...new Set(favorites)];
    localStorage.setItem(
      FAVORITE_ITEM_LS_KEY,
      JSON.stringify(this._favoriteIds)
    );
  }

  public get favoriteIds(): number[] {
    return this._favoriteIds;
  }

  public get favoriteProducts(): IProduct[] {
    return this.allProducts.filter((item) =>
      this.favoriteIds.includes(item.id)
    );
  }

  private set cart(cards: ICartItem[]) {
    this._cart = [...new Set(cards)];
    localStorage.setItem(CART_ITEMS_LS_KEY, JSON.stringify(cards));
  }

  public get cart() {
    return this._cart;
  }

  public get countItemsInCart() {
    return this.cart.reduce((acc, item) => acc + item.count, 0);
  }

  public get cartItems() {
    return this.allProducts.filter((product) =>
      this.cart.find((cartItem) => cartItem.id === product.id)
    );
  }

  public get totalCartPrice() {
    return this.cart
      .reduce((acc, cartItem) => {
        const item = this.allProducts.find((item) => item.id === cartItem.id);
        return acc + (item ? item.price : 0) * cartItem.count;
      }, 0)
      .toFixed(2);
  }

  public addToFavorite(id: number) {
    this.favoriteIds.push(id);
    this.favoriteIds = this.favoriteIds.slice();
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
    this.favoriteIds = this.favoriteIds.filter((item) => item !== id);
  }

  public set sortField(field: keyof IProduct) {
    this._sortField = field;
    this.applyConstrains();
  }

  public get sortField() {
    return this._sortField;
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
    this._filterCategory = category;
    this.applyConstrains();
  }
  public clearFilter() {
    this._filterCategory = undefined;
    this.applyConstrains();
  }

  public revertSort() {
    this._descSort = !this._descSort;
    this.applyConstrains();
  }

  private applyConstrains() {
    let applyingArray = this.allProducts.slice();
    applyingArray = this.sort(applyingArray, this._descSort, this._sortField);
    if (this._filterCategory)
      applyingArray = applyingArray.filter(
        ({ category }) => category === this._filterCategory
      );
    if (this.onlyFavorites)
      applyingArray = applyingArray.filter(({ id }) =>
        this.favoriteIds.includes(id)
      );
    this.filteredProduct = applyingArray;
  }
}
