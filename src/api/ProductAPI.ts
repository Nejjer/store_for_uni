import { IProduct, IProductDetailed } from '../stores/ShopStore';
import { axiosInstance } from '../axios';

class ProductAPI {
  async getAllProduct(): Promise<IProduct[]> {
    return (await axiosInstance.get<IProduct[]>('products')).data;
  }

  async getProduct(id: number): Promise<IProductDetailed> {
    return (await axiosInstance.get<IProductDetailed>(`products/${id}`)).data;
  }
}

export const productApi = new ProductAPI();
