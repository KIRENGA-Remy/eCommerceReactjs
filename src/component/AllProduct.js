import React, { useEffect, useState } from 'react'
import CardFeature from './CardFeature'
import FilterProduct from './FilterProduct'
import { useSelector } from 'react-redux'

const AllProduct = ({heading}) => {
  const productData = useSelector((state) => state.product.productList)

  const filterProductCategoryList = [...new Set(productData.map(el => el.category))];

  const loadingArrayFeature = new Array(10).fill(null);
  
const [dataFilter, setDataFilter] = useState([]);

useEffect(() => {
  setDataFilter(productData);
}, [productData]);


const handleDataFilter = (category) => {
  const filterBy = productData.filter(el => el.category.toLowerCase() === category.toLowerCase());
  setDataFilter(() => {
    return[
      ...filterBy
    ]
  })
}

  return (
    <>
      <div className='text-slate-600 font-medium text-2xl my-5 mx-5'>{heading}</div>
      <div className='flex justify-center gap-6 overflow-scroll scrollbar-none'>
        {
          filterProductCategoryList[0] ? filterProductCategoryList.map(el => {
            return(
            <FilterProduct category={el} onClick={() => handleDataFilter(el)} />
            )
          })
          :
          <div className='flex justify-center items-center h-full font-medium'>
          <p>Loading...</p>
        </div>
        }
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
      {
        dataFilter[0] ? dataFilter.map(el => {
          return(
            <CardFeature 
            key={el._id}
            image={el.image}
            name={el.name}
            category={el.category}
            price={el.price}
            id={el._id}
            />
          )
        })
        : 
          loadingArrayFeature.map(el => <CardFeature loading={"Loading..."}/> )
      }
      </div>
      </>
  )
}

export default AllProduct
