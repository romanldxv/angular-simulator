import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(itemKey: string, value: T): void {
    if (typeof value === 'string') {
      localStorage.setItem(itemKey, value);
      return;
    }
    localStorage.setItem(itemKey, JSON.stringify(value));
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
