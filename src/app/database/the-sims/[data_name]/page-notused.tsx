import React from 'react'
import { GetAllCastaway } from '@/service/the-sims-service';
import CastawayProduct from './components/CastawayProduct';
import { notFound } from 'next/navigation';

const acceptedRoute = ['castaway-product', 'bustin-out-job', 'two-pets-product'];

export default async function DataPage({ params } : { params : { data_name : string } }){
  
  if (!acceptedRoute.includes(params.data_name)) return notFound();
  
  let data = await GetAllCastaway();
  return (<CastawayProduct data={data}/>)
}