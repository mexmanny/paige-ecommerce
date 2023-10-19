'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Product, ProductListType } from '../types';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
  const [productdata, setProductData] = useState<Product[]>([]);
  const [colorFilterQuery, setColorFilterQuery] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProductData(data.products);
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
          <input
            id="color_filter"
            value={colorFilterQuery}
            className="w-[300px] text-black p-2 outline-none border-none rounded-sm my-4"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setColorFilterQuery(e.target.value);
            }}
            placeholder="Please enter a color to filter products by"
          />
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
