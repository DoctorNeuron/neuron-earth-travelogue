'use client'

import BasicTable from '@/components/basic-table/BasicTable';
import { Row, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import classNames from 'classnames';
import Image from 'next/image';
import { notFound } from 'next/navigation'
import React from 'react'
import { MOCKS } from './test';

const acceptedRoute = ['castaway-product', 'bustin-out-job', 'two-pets-product'] 
type AcceptedRoute = 'castaway-product' | 'bustin-out-job' | 'two-pets-product';

export interface SimpleProduct {
  id: string,
  name: string,
  image: string,
  description: string,
  category: string,
  hunger: number,
  bladder: number,
  energy: number,
  eaten_raw: boolean
}

export default function TheSimsDatabasePage({ params }: { params: { data_name: string } }) {
  if (!acceptedRoute.includes(params.data_name)) return notFound();
  const route = params.data_name as AcceptedRoute;

  return (
    <div>
      <h1 className='text-3xl mb-7 font-bold'>Castaway Product</h1>
      <CastawayProduct/>
    </div>
  )
}

function CastawayProduct(){
  const colHelper = createColumnHelper<SimpleProduct>();
  const column = [
    colHelper.accessor('id', {
      cell: i => (<code>{i.getValue()}</code>),
      header: 'ID'
    }),
    colHelper.accessor('name', {
      cell: i => i.getValue(),
      header: 'Name'
    }),
    colHelper.display({
      id: 'image',
      header: 'Image',
      cell: props => (
        <div className='flex justify-center rounded-md overflow-hidden'>
          <Image width={60} height={60} src={props.row.original.image} alt={props.row.original.name} />
        </div>
      )
    }),
    colHelper.accessor('hunger', {
      cell: i => (
        <div className='text-center'>{i.getValue()}</div>
      ),
      header: 'Hunger',
    })
  ];

  const rowClick = (row: Row<SimpleProduct>) => {
    console.log(row.original.name);
  }

  return (
    <BasicTable column={column} data={MOCKS} onRowClick={rowClick} onRowClickClass='bg-gray-800' />
  );
}