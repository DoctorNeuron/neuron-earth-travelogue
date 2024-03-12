"use client"

import BasicTable from "@/components/basic-table/BasicTable";
import { Tables } from "@/model/database/database.types";
import { Row, createColumnHelper } from "@tanstack/react-table";

export default function BustinOutJobs({ data }: { data : Tables<'the_sims_bustin_out_job'>[] })
{ 
  // const data = use(GetAllCastaway());
  const colHelper = createColumnHelper<Tables<'the_sims_bustin_out_job'>>();
  const column = [
    colHelper.accessor('career', { cell: i => i.getValue(), header: "Career" }),
    colHelper.accessor('job', { cell: i => i.getValue(), header: "Job" }),
    colHelper.accessor('level', { cell: i => i.getValue(), header: "Level" }),
    colHelper.accessor('salary', { cell: i => i.getValue(), header: "Salary" }),
    colHelper.accessor('description', { cell: i => i.getValue(), header: "Description", enableMultiSort: false, enableSorting: false }),
  ];

  const rowClick = (row: Row<Tables<'the_sims_bustin_out_job'>>) => {

  }

  return (
    <BasicTable column={column} data={data} onRowClick={rowClick} onRowClickClass='bg-gray-800' />
  );
}
