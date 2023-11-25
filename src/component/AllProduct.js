import React, { useEffect, useState } from 'react';
import CardFeature from './CardFeature';
import FilterProduct from './FilterProduct';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  const filterProductCategoryList = [...new Set(productData.map((el) => el.category))];

  const [dataFilter, setDataFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleDataFilter = (category) => {
    setSelectedCategory(category);
    const filterBy = productData.filter((el) => el.category.toLowerCase() === category.toLowerCase());
    setDataFilter(filterBy);
  };

  const isFilterLoading = filterProductCategoryList.length === 0;
  const isDataLoading = dataFilter.length === 0;

  return (
    <>
      <div className='text-slate-600 font-medium text-2xl my-5 mx-5'>{heading}</div>
      {isFilterLoading ? (
        <div className='flex justify-center items-center h-full font-medium'>
        </div>
      ) : (
        <div className="flex gap-6 justify-center overflow-scroll scrollbar-none">
          {filterProductCategoryList.map((el) => (
            <FilterProduct
              key={el}
              category={el}
              isActive={el.toLowerCase() === selectedCategory.toLowerCase()}
              onClick={() => handleDataFilter(el)}
            />
          ))}
        </div>
      )}
      {isDataLoading ? (
        <div className='flex justify-center items-center h-full font-medium'>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-4'>
          {dataFilter.map((el) => (
            <CardFeature
              key={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
              id={el._id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AllProduct;
