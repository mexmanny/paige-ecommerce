import Link from 'next/link';
import { ProductRowProps } from '../types';
import Button from './Button';

const ProductRow = ({ sku, name, color, type, cost }: ProductRowProps) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-2 py-3 border-b border-gray-400">
      <p className="col-span-4">{name}</p>
      <p className="col-span-2">{color}</p>
      <p className="col-span-2">{type}</p>
      <p className="col-span-2">{cost}</p>
      <Link href={`/product-detail/${sku}`}>
        <span className="text-blue-400 font-medium cursor-pointer">Edit</span>
      </Link>
    </div>
  );
};

export default ProductRow;
