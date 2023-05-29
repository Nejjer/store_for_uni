import { makeAutoObservable, runInAction } from 'mobx';

export const SNACKBAR_DELAY = 4000;
export class SnackbarStore {
  private isOpen: boolean;
  private message: string;

  constructor() {
    this.isOpen = false;
    this.message = '';
    makeAutoObservable(this);
  }

  public showSnackBar(message: string) {
    this.isOpen = true;
    this.message = message;
  }

  public onClose() {
    this.isOpen = false;
    runInAction(() => setTimeout((this.message = ''), SNACKBAR_DELAY));
  }
}
