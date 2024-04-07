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

  const title = 
    paramReal === 'castaway-product' ? "The Sims Castaway Product" :
    paramReal === 'bustin-out-job' ? "The Sims Bustin Out Job" :
    paramReal === 'two-pets-product' ? "The Sims Two Pets Product" : ""

  async function getTable(){
    if (paramReal === 'castaway-product') {
      return (<CastawayProduct data={await GetAllCastaway()}/>)
    }
    if (paramReal === 'bustin-out-job') {
      return (<BustinOutJobs data={await GetAllJobs()}/>)
    }
    if (paramReal === 'two-pets-product') {
      return (<PetsProduct data={await GetAllPets()}/>)
    }
  }
  

  return (
    <div className='relative'>
      <h1 className='font-bold text-3xl pb-10 sticky top-0'>{title}</h1>
      <div className='relative'>
        { await getTable() }
      </div>
    </div>
  )
}