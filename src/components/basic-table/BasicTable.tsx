'use client'

import { ColumnDef, Row, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import classNames from 'classnames'
import React, { useState } from 'react'
import './BasicTable.css'

export interface BasicTableProps<T> {
  column: ColumnDef<T, any>[],
  data: T[],
  onRowClick?: (row: Row<T>) => void,
  onRowClickClass?: string,
  title?: string,
  enableSorting?: boolean
}

export default function BasicTable<T>(props: BasicTableProps<T>) {

  const [click, setClick] = useState("");
  const [search, setSearch] = useState("");

  const col: ColumnDef<T, any>[] = [
    {
      header: 'No',
      id: 'index',
      cell: ({ row, table }) => table.getSortedRowModel()?.flatRows?.findIndex((fr) => fr.id === row.id || 0) + 1
    },
    ...props.column
  ];

  const table = useReactTable({
    columns: col,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearch,
    state: {
      globalFilter: search
    }
  });


  const rowClick = (row: Row<T>) => {
    setClick(row.id);
    const cl = props.onRowClick ?? (() => {  });
    cl(row);
  }

  return (
    <div className='freeze-table scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 bg-neutral-900'>
      <table className='table-auto'>
        <thead className='bg-neutral-900'>
          <tr>
            <th colSpan={col.length}>
              <div className='p-2 flex justify-between items-center sticky top-0 gap-3'>
                <input className={classNames('bg-transparent outline-none border-white/50 border-2 rounded-md appearance-none w-full py-1.5 px-1',
                  'font-normal'
                )}
                  type="search"
                  value={search}
                  placeholder='Input keywords here...'
                  onChange={e => { setSearch(e.target.value) }} />
                <div className='whitespace-nowrap break-normal h-full'>
                  <button className='bg-blue-900 p-1.5 text-sm rounded-md hover:bg-blue-950'
                    onClick={_ => { setSearch("") }}>Reset Search</button>
                </div>
                <div className='whitespace-nowrap break-normal h-full'>
                  <button className='bg-blue-900 p-1.5 text-sm rounded-md hover:bg-blue-950'
                    onClick={_ => { table.resetSorting() }}>Reset Sort</button>
                </div>
              </div>
            </th>
          </tr>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id}>
                  {h.isPlaceholder ? null :
                    <div className={classNames('flex justify-center items-center gap-4', {
                      'cursor-pointer select-none': (h.column.getCanSort())
                    })}
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}

                      {
                        (h.column.getCanSort()) &&
                        <div>
                          {
                            h.column.getIsSorted() === 'asc' ? '⬆️' :
                              h.column.getIsSorted() === 'desc' ? '⬇️' : '🟰'
                          }
                        </div>
                      }
                    </div>
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className='bg-neutral-800'>
          
          {table.getRowModel().rows.length > 0 && table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => { rowClick(row) }} className={classNames(
              'hover:bg-blue-400/5',
              row.id === click ? props.onRowClickClass ?? '' : '',
            )}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={classNames({
                  'text-center': cell.column.id === 'index'
                })}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {
            table.getRowModel().rows.length == 0 && 
            <tr>
              <td colSpan={col.length} className='text-center'>Not Found :&#40;</td>
            </tr>
          }
        </tbody>
      </table>

    </div>
  )
}
