import { ColumnDef, Row, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import classNames from 'classnames'
import React, { useState } from 'react'
import './BasicTable.css'

export interface BasicTableProps<T>
{
  column: ColumnDef<T, any>[],
  data: T[],
  onRowClick?: (row: Row<T>) => void,
  onRowClickClass?: string
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
    getSortedRowModel: getSortedRowModel()
  });

  const [click, setClick] = useState("");

  const rowClick = (row: Row<T>) => {
    setClick(row.id);
    const cl = props.onRowClick ?? (() => { });
    cl(row);
  }

  return (
    <div className='freeze-table'>
      <table className='table-auto'>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id}>
                  {h.isPlaceholder ? null : 
                    <div className={classNames('flex justify-center gap-4', {
                      'cursor-pointer select-none': h.column.getCanSort()
                    })}
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      {
                        flexRender(h.column.columnDef.header, h.getContext())
                      }

                      { h.column.getCanSort() && <div>
                        {
                          h.column.getIsSorted() === 'asc' ? '⬆️' :
                          h.column.getIsSorted() === 'desc' ? '⬇️' : '🟰'
                        }
                      </div>}
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
              row.id === click ? props.onRowClickClass ?? '' : ''
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
