import React from 'react'
import { CiForkAndKnife } from 'react-icons/ci';

const FilterProduct = ({category, onClick, isActive}) => {
  return (
    <div onClick={onClick}>
    <div className={`text-3xl p-6 rounded-full cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
      <CiForkAndKnife/>
    </div>
    <div className='font-semibold text-center capitalize'>
    <p>{category}</p>
    </div>
    </div>
  )
}

export default FilterProduct
