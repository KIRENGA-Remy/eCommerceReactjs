import React from 'react'
import { CiForkAndKnife } from 'react-icons/ci';

const FilterProduct = ({category, onClick}) => {
  return (
    <div onClick={onClick}>
    <div className='text-3xl p-6 bg-yellow-500 rounded-full cursor-pointer'>
      <CiForkAndKnife/>
    </div>
    <div className='font-semibold text-center capitalize'>
    <p>{category}</p>
    </div>
    </div>
  )
}

export default FilterProduct
