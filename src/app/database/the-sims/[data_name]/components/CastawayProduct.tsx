"use client"

import BasicTable from "@/components/basic-table/BasicTable";
import { Tables } from "@/model/database/database.types";
import { Row, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

export default function CastawayProduct({ data }: { data : Tables<'the_sims_castaway_product'>[] })
{ 
  // const data = use(GetAllCastaway());
  const colHelper = createColumnHelper<Tables<'the_sims_castaway_product'>>();
  const column = [
    colHelper.display({
      id: 'image',
      header: 'Image',
      cell: props => (
        <div className='flex justify-center rounded-md overflow-hidden'>
          <Image width={60} height={60} src={props.row.original.image} alt={props.row.original.name} />
        </div>
      )
    }),
    colHelper.accessor('name', {
      cell: i => i.getValue(),
      header: 'Name'
    }),
    colHelper.accessor('hunger', {
      cell: i => (<div className='text-center'>{i.getValue()}</div>),
      header: 'Hunger',
    }),
    colHelper.accessor('bladder', {
      cell: i => (<div className='text-center'>{i.getValue()}</div>),
      header: 'Bladder',
    }),
    colHelper.accessor('energy', {
      cell: i => (<div className='text-center'>{i.getValue()}</div>),
      header: 'Energy',
    }),
    colHelper.accessor('eaten_raw', {
      cell: i => (<div className='text-center'>{i.getValue() ? '✔️' : '❌'}</div>),
      header: 'Eaten Raw',
    }),
    colHelper.display({
      cell: props => props.row.original.description,
      header: 'Description',
      enableResizing: true
    }),
  ];

  const rowClick = (row: Row<Tables<'the_sims_castaway_product'>>) => {
    console.log(row.original.name);
  }

  return (
    <BasicTable column={column} data={data} onRowClick={rowClick} onRowClickClass='bg-gray-800' />
  );
}
