'use client'

import { Tables } from '@/model/database/database.types';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import React, { useState } from 'react'

interface SimpleProduct {
  id: string,
  name: string,
  image: string,
  description: string,
  hunger: number
}

function GetData() {

  const mock: Tables<'the_sims_castaway_product'>[] = [
    {
      id: '02ad5dd8-c0e9-4c00-b1e7-6b203185e35c',
      name: 'Mitre Shell',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/mitre_shell.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: 'Prehistoric mitre shells measured 20 cubits in length, and were covered in shaggy fur.'
    },
    {
      id: '030b38b0-1bea-4d86-a7dc-21819259c795',
      name: 'Ham',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Meats/ham.png',
      eaten_raw: false,
      hunger: 50,
      bladder: -11,
      energy: 7,
      category: 'Meats',
      description: 'There are countless way to prepare a succulent ham: spiced, diced, and even baked in a radiant glaze of glory.'
    },
    {
      id: '03d8a784-d2f4-46db-883f-8a7754f1c6a4',
      name: 'Soap Plant',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/soap_plant.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: "If it wasn't for this one miracle plant, your hygiene would be yet another unfortunate casualty of the shipwreck."
    },
    {
      id: '07f6a342-ba20-4088-8497-f0eff5ec539b',
      name: 'Shark Leather',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/shark_leather.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: 'Sharks were once docile, good humored animals until people started making shoes out of them.'
    },
    {
      id: '090bfe08-7006-4b50-93f1-2c6b1a2c802c',
      name: 'Freshwater Eel',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Meats/freshwater_eel.png',
      eaten_raw: false,
      hunger: 28,
      bladder: -10,
      energy: 11,
      category: 'Meats',
      description: "Don't let its freshwater innocence fool you, this anguilliformes comes from a house of eel repute."
    },
    {
      id: '099481da-426d-45fb-a874-6a14f924ce9c',
      name: 'Alien Food',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Meats/alien_food.png',
      eaten_raw: false,
      hunger: 53,
      bladder: -6,
      energy: 15,
      category: 'Meats',
      description: "Colonels Yylarg's Gourmet Space Slurry. Now with 20% more Blarg Mjark!"
    },
    {
      id: '0a738754-6e07-4e0c-99fd-359529d842e1',
      name: 'Ti Leaves',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/ti_leaves.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: 'Ti Leaves have been traditionally used as part of clothing creation and decoration.'
    },
    {
      id: '0b0c0ab6-451f-4dd7-81eb-1d6969ee5661',
      name: 'Purple Orchid',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/purple_orchid.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: 'Only the most virile bees dare attempt to pollinate the voluptuous purple orchid.'
    },
    {
      id: '0b2ffed0-35d4-4617-8335-66202d93f21b',
      name: 'Egg',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Meats/egg.png',
      eaten_raw: false,
      hunger: 26,
      bladder: -5,
      energy: 5,
      category: 'Meats',
      description: "The noble egg. Fruit of a chicken's posterior."
    },
    {
      id: '0d9aabc6-b150-4485-b848-89d8cd6e1422',
      name: 'Moonstone',
      image: 'https://raw.githubusercontent.com/apify-apps/apify-static-assets/master/TheSims/CastawayProducts/Resources/moonstone.png',
      eaten_raw: false,
      hunger: 0,
      bladder: 0,
      energy: 0,
      category: 'Resources',
      description: 'Moonstone appear in a multitude of colors, none of which look like the moon.'
    }
  ];

  return mock.map<SimpleProduct>(x => ({
    ...x
  }));

  // const res = await SUPABASE
  //   .from('the_sims_castaway_product')
  //   .select()
  //   .limit(10);

  // console.log(res.data);

  // return res.data ?? [];
}

export default function DatabasePage() {

  const [data, setData] = useState(GetData());
  const colHelper = createColumnHelper<SimpleProduct>();
  const columns = [
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


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='rounded-lg overflow-hidden'>
      <p>Data hehe</p>
      <table className='table-auto'>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id} className='border-b-white border-b-[3px]'>
              {hg.headers.map(h => (
                <th key={h.id} className='p-2 text-lg'>
                  {h.isPlaceholder ? null : flexRender(
                    h.column.columnDef.header,
                    h.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b-white border-b-[1px]'>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='p-2 pl-3 pr-3'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
