import { promises as fs } from 'fs';
import { Product } from '../types';

export const fetchProducts = async () => {
  const file = await fs.readFile(
    process.cwd() + '/app/data/product-fixtures.json',
    'utf8'
  );
  const data = await JSON.parse(file);
  return data;
};

export const fetchDetailBySku = async (sku: string) => {
  const productData = await fetchProducts();
  const product = productData.filter((item: Product) => item.sku == sku);
  return product[0];
};

export const updateDetailsBySkuId = async (sku: string, data: Product) => {
  const productData = await fetchProducts();
  const originalProducts = productData.filter(
    (item: Product) => item.sku != sku
  );
  const updatedNewProduct = [...originalProducts, data];
  await fs.writeFile(
    process.cwd() + '/app/data/product-fixtures.json',
    JSON.stringify(updatedNewProduct),
    'utf-8'
  );
  return data;
};
