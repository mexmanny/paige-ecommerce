import { fetchProducts } from '@/app/handlers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const products = await fetchProducts();
  return NextResponse.json({ products });
};
