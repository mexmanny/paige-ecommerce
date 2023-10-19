import { fetchDetailBySku, updateDetailsBySkuId } from '@/app/handlers';

import { NextRequest, NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const GET = async (request: NextRequest, { params }: Params) => {
  const skuCode = params['sku'];
  const details = await fetchDetailBySku(skuCode);
  return NextResponse.json(details);
};

export const PATCH = async (request: NextRequest, { params }: Params) => {
  const payload = (await request.json()) || {};
  const skuCode = params['sku'];
  const details = await updateDetailsBySkuId(skuCode, payload);
  return NextResponse.json(details);
};
