import { ToastType } from "../enums/ToastType";

export interface IToast {
  id: number;
  type: ToastType;
  text: string;
}