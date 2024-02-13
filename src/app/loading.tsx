import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function BlogLoading() {
  return (
    <>
      <Skeleton height={60}/>
      <br/>
      <Skeleton height={40}/>
      <Skeleton/>
      <br/>
      <Skeleton count={12}/>
      <br/>
      <Skeleton height={40}/>
      <Skeleton/>
      <br/>
      <Skeleton count={3}/>
    </>
  )
}
