'use client'

import { ColumnDef, Row, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import classNames from 'classnames'
import React, { useState } from 'react'
import './BasicTable.css'
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'

export interface BasicTableProps<T> {
  column: ColumnDef<T, any>[],
  data: T[],
  onRowClick?: (row: Row<T>) => void,
  onRowClickClass?: string,
  title?: string,
  enableSorting?: boolean
}

export default function BasicTable<T>(props: BasicTableProps<T>) {

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
    isMultiSortEvent: (e) => true,
    globalFilterFn: (row, colID, value, addMeta) => {
      return value === search;
    }
  });

  const [click, setClick] = useState("");
  const [search, setSearch] = useState("");

  const rowClick = (row: Row<T>) => {
    setClick(row.id);
    const cl = props.onRowClick ?? (() => { });
    cl(row);
  }

  return (
    <div className='freeze-table scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20'>
      <input className='bg-transparent outline-none border-white border-2' type="text" value={search} onChange={e => { setSearch(e.target.value) }} />
      <div className='p-2 flex justify-between items-center'>
        <div className='font-bold'>
          { props.title ?? "Table" }
        </div>
        <div>
        <button className='bg-blue-900 p-1.5 text-sm rounded-md hover:bg-blue-950'
          onClick={_ => { table.resetSorting() }}>Reset All Sorting</button>
        </div>
      </div>
      <table className='table-auto'>
        <thead>
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

        <tbody>
          {table.getRowModel().rows.map(row => (
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
        </tbody>
      </table>

    </div>
  )
}
