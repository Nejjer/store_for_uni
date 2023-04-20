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
  public products: IProduct[] = [];

  constructor() {
    this.fetchProduct();
    makeAutoObservable(this);
  }

  private async fetchProduct() {
    const response = (await axiosInstance.get<IProduct[]>('products')).data;
    runInAction(() => {
      this.products = response;
    });
  }
}
