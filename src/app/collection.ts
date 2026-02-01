export class Collection<T> {

  items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  getItem(index: number): T {
    return this.items[index];
  }

  deleteAll(): void {
    this.items = [];
  }
  
  delete(index: number): void {
    this.items.splice(index, 1);
  }

  setItem(index: number, item: T): void {
    this.items[index] = item;
  }
  
}