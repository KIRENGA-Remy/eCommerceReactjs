import React, { useRef } from 'react';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import {GrPrevious, GrNext} from 'react-icons/gr';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  const homeProductCartList = productData.slice(1,5);
  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetable");
  const loadingArray = new Array(4).fill(null);

  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 165;
  }

  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 165;
  }
  
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
            <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className='h-7' alt="Bike Delivery" />
          </div>
          <h2 className='text-4xl md:text-6xl font-bold py-3'>The fastest Delivery in <span className='text-red-600'>Your Home</span> </h2>
          <p className='py-3 text-base'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Dolorum, vitae deleniti totam exercitationem alias dolores, ab recusandae facere dicta suscipit veniam 
          asperiores facilis quisquam qui eligendi debitis earum? Blanditiis, voluptatum?</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 hover:bg-red-600 rounded-md'>Order Now</button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-4 p-3 justify-center'>
          {

            homeProductCartList[0] ? homeProductCartList.map(el=>{
              return (
                <HomeCard 
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                id={el._id}
                 />
              )
            }) :
              loadingArray.map((el, index) => {
                return(
                <HomeCard 
                key={index}
                loading={"Loading..."}
                />
                )
              })
          }
        </div>
      </div> 
      <div>
      <div className='text-slate-600 font-medium text-2xl my-5'>Fresh Vegetables</div>
      <div className='ml-auto flex gap-4'>
    <button onClick={previousProduct} className='bg-slate-400 hover:bg-slate-500 font-bold text-xl'><GrPrevious /></button>
    <button onClick={nextProduct} className='bg-slate-400 hover:bg-slate-500 font-bold text-xl'><GrNext /></button>
    </div>
      </div>
      <div className='flex gap-4 cursor-pointer overflow-scroll scrollbar-none scroll-smooth transition-all' style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }} ref={slideProductRef}>
      {
        homeProductCartListVegetables[0] ? 
         homeProductCartListVegetables.map(el => { 
          return(
            <CardFeature 
            key={el._id}
            image={el.image}
            name={el.name}
            price={el.price}
            category={el.category}
            id={el._id}
            />
          )
        })
        : 
        loadingArrayFeature.map(el => <CardFeature loading={"Loading..."}/> )
      }
      </div>
      <AllProduct heading={"Your Products"}/>
      </div>
  );
}

export default Home;
