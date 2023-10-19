import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

export type ProductListType = {
  productList: Product[];
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  type: string;
  description: string;
  color: string;
  price: number;
};

export type ProductRowProps = {
  id: string;
  sku: string;
  name: string;
  color: string;
  type: string;
  cost: number;
};

export interface InputProps {
  id: string;
  //type: HTMLInputTypeAttribute;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeHolder: string;
  term: string;
}

export interface ButtonProps {
  id: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: MouseEventHandler<HTMLElement>;
  label: string;
}

export interface FormProps {
  id: string;
  formRole: string;
  formLabel: string;
  onSubmit?: FormEventHandler<HTMLElement>;
  children: ReactNode;
}
