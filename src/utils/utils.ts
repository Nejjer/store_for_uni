class Utils {
  public sortDesc<T>(arr: T[], field: keyof T) {
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

  public sortAsc<T>(arr: T[], field: keyof T) {
    return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (b[field] > a[field]) {
        return -1;
      }
      return 0;
    });
  }
}

export const utils = new Utils();
