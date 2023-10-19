import React, { Fragment } from 'react';
import { Product, ProductListType } from '../types';
import ProductRow from './ProductRow';

const ProductList = ({ productList }: ProductListType) => {
  return (
    <div className="w-screen flex flex-col items-center justify-center p-5">
      <h1 className="mb-4 text-xl">ProductList</h1>
      <div className="w-full">
        <div className="grid grid-cols-12 gap-4 font-semibold bg-gray-600 rounded-t-lg p-3">
          <p className="col-span-4">Name</p>

          <p className="col-span-2">Color</p>
          <p className="col-span-2">Type</p>
          <p className="col-span-2">Cost</p>
          <p className="col-span-2">Actions</p>
        </div>
        {productList.map((product: Product, index: number) => (
          <Fragment key={product?.id + index + '-key'}>
            <ProductRow
              id={product.id}
              type={product.type}
              name={product.name}
              color={product.color}
              cost={product.price}
              sku={product.sku}
            ></ProductRow>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
