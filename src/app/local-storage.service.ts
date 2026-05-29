import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(itemKey: string, value: T): void {
    const item: string = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(itemKey, item);
  }

  getItem<T>(itemKey: string): T | null {
    const item: string | null = localStorage.getItem(itemKey);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch {
      return item as T;
    }
  }

  removeItem(itemKey: string): void {
    localStorage.removeItem(itemKey);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
