'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import { Product } from '@/app/types';
import { FormikInput } from '@/app/components/FormikInput';
import * as Yup from 'yup';
import error from 'next/error';

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const pathName = usePathname();
  const sku = pathName.split('/').slice(-1);

  const handleUpdateProduct = async (values: Product) => {
    try {
      const response = await fetch(
        `/api/product-detail/${pathName.split('/').slice(-1)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        router.push('/product-list');
      } else {
        console.error('Error updating product:', error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/product-detail/${sku}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();

    return () => {
      setProduct(null);
    };
  }, []);
  return (
    <div className="w-screen w-height flex flex-col items-center justify-center p-5">
      <h1 className="font-bold text-xl mb-4">Product Details - SKU: {sku}</h1>
      {product ? (
        <>
          <Formik
            onSubmit={handleUpdateProduct}
            initialValues={product}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              description: Yup.string()
                .required('Description is required')
                .max(56, 'Maximum 56 chars allowed'),
              color: Yup.string()
                .required('Color is required')
                .max(56, 'Maximum 56 chars allowed'),
              type: Yup.string()
                .required('Type is required')
                .max(56, 'Maximum 56 chars allowed'),
              price: Yup.number()
                .required('Price is required')
                .min(0, 'Price cannot be less than zero'),
            })}
          >
            {({ isValid }) => (
              <Form className="w-1/2 bg-grey rounded-lg p-5">
                <label htmlFor="product_name" className="block my-4">
                  <span className="font-medium text-lg block mb-2">
                    Product Name
                  </span>
                  <FormikInput id="product_name" name="name" />
                </label>
                <label htmlFor="product_type" className="block my-4">
                  <span className="font-medium text-lg block mb-2">
                    Product Type
                  </span>
                  <FormikInput id="product_type" name="type" />
                </label>
                <label htmlFor="product_description" className="block my-4">
                  <span className="font-medium text-lg block mb-2">
                    Product Description
                  </span>
                  <FormikInput
                    id="product_description"
                    type="textarea"
                    name="description"
                  />
                </label>
                <label htmlFor="product_color" className="block my-4">
                  <span className="font-medium text-lg block mb-2">
                    Product Color
                  </span>
                  <FormikInput id="product_color" name="color" />
                </label>
                <label htmlFor="product_price" className="block my-4">
                  <span className="font-medium text-lg block mb-2">
                    Product Price
                  </span>
                  <FormikInput id="product_price" name="price" type="number" />
                </label>
                <div className="w-full text-center">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 hover:disabled:bg-gray-400 disabled:cursor-not-allowed w-[200px] rounded-full p-2 text-white my-4 h-11 mx-auto"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
