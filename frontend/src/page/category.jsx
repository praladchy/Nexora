import React from 'react'
import ProductList from '../components/product/ProductList'
import CategoryByParentId from '../components/CategorySlider/CategoryByParentId'
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const {id}=useParams();
  console.log("dfghjk",id)
  return (
    <>
    <CategoryByParentId id={id}/>
    <ProductList/>
    </>
  )
}

export default CategoryProducts