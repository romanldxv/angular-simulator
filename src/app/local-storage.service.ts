import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(itemKey: string, value: T): void {
    localStorage.setItem(itemKey, JSON.stringify(value));
  }

  getItem<T>(itemKey: string): T {
    return JSON.parse(localStorage.getItem(itemKey) ?? "Ключ не найден");
  }

  removeItem(itemKey: string): void {
    localStorage.removeItem(itemKey);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
