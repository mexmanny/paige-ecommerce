'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Product, ProductListType } from '../types';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
  const [productdata, setProductData] = useState<Product[]>([]);
  const [colorFilterQuery, setColorFilterQuery] = useState('');
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductData(data.products);
        const uniqueColors = data.products.reduce(
          (unique: string[], product: { color: string }) => {
            if (!unique.includes(product.color)) {
              unique.push(product.color);
            }
            return unique;
          },
          []
        );

        setAvailableColors(uniqueColors);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <form className="my-4 w-full flex justify-center">
        <label htmlFor="color_filter" className="block w-[300px] text-center">
          <span className="block">Filter by Color</span>
          <select
            id="color_filter"
            value={colorFilterQuery}
            className="w-[300px] text-black p-2 outline-none border-none rounded-sm my-4"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setColorFilterQuery(e.target.value);
            }}
          >
            <option value="">All Colors</option>
            {availableColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
      </form>
      {productdata.length > 0 ? (
        <ProductList
          productList={
            colorFilterQuery.trim().length
              ? productdata.filter(
                  (item: Product) =>
                    item.color.toLocaleLowerCase() ==
                    colorFilterQuery.toLocaleLowerCase()
                )
              : productdata
          }
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductListPage;
