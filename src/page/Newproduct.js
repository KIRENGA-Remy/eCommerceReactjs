import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const NewProduct = () => {

  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: ""
  })
  
  const handleOnChange = (e) => {
    const {name,value} = e.target
     setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
     })
  }

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);

    setData((preve) => {
      return{
        ...preve,
        image: data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
const {name, category, image, description} = data;

if(name && category && image && description){
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadproducts`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataRes = await fetchData.json();
    console.log(dataRes);
    toast(dataRes.message);

  } else {
    toast("All fields are required")
  }
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' className='bg-slate-300 p-1 my-1' value={data.name} onChange={handleOnChange} />

        <label htmlFor="category">Category</label>
        <select className='bg-slate-300 p-1' id='category' name='category' onChange={handleOnChange} >
        <option value={"other"}>Select Category</option>
          <option value={"fruit"}>Fruit</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Ice cream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor="image">Image
        <div className='h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} className='h-full' /> : <span className='text-5xl'><BsCloudUpload /></span>
          }
          <input type={"file"} accept='image/*' name='image' id='image' onChange={uploadImage} className='hidden' />
        </div>
        </label>

        <label htmlFor="price" className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-300 p-1 my-1' name='price' onChange={handleOnChange}  />

        <label htmlFor="description">Description</label>
        <textarea rows={2} className='bg-slate-300 p-1 my-1 resize-none' name='description' onChange={handleOnChange} ></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  );
        }

export default NewProduct;
