import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(itemKey: string, value: T): void {
    localStorage.setItem(itemKey, JSON.stringify(value));
  }

  getItem<T>(itemKey: string): T | null {
    const item: string | null = localStorage.getItem(itemKey);
    return item ? JSON.parse(item) : null;
  }

  removeItem(itemKey: string): void {
    localStorage.removeItem(itemKey);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
