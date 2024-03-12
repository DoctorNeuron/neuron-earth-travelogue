import React from 'react'
import { GetAllCastaway, GetAllJobs, GetAllPets } from '@/service/the-sims-service';
import CastawayProduct from './components/CastawayProduct';
import { notFound } from 'next/navigation';
import BustinOutJobs from './components/BustinOutJobs';
import PetsProduct from './components/PetsProducts';

const acceptedRoute = ['castaway-product', 'bustin-out-job', 'two-pets-product'];
type AcceptedRoute = 'castaway-product' | 'bustin-out-job' | 'two-pets-product';

export default async function DataPage({ params } : { params : { data_name : string } }){
  
  if (!acceptedRoute.includes(params.data_name)) return notFound();
  const paramReal = params.data_name as AcceptedRoute;
  
  if (paramReal === 'castaway-product') {
    let data = await GetAllCastaway();
    return (<CastawayProduct data={data}/>)
  }
  if (paramReal === 'bustin-out-job') {
    let data = await GetAllJobs();
    return (<BustinOutJobs data={data}/>)
  }
  if (paramReal === 'two-pets-product') {
    let data = await GetAllPets();
    return (<PetsProduct data={data}/>)
  }
}