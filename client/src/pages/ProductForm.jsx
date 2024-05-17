import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ProductForm = () => {
const fileInput = useRef();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadBook = async(e)=>{
       e.preventDefault();
       console.log({title,category,author,publisher,price,image});
       if(price<0){
        setError("Price should be more than 0");
        return;
       }
       const formData = new FormData();
       formData.append("title",title);
       formData.append("category",category);
       formData.append("author",author);
       formData.append("publisher",publisher);
       formData.append("price",price);
       formData.append("image",image);
       try {
         setLoading(true);
         const res = await fetch("http://localhost:4000/api/admin/uploadbook",{
            method:"POST",
            body: formData,
            
           })
           const data = await res.json();
           console.log(res);
           console.log(data);
          
           if(res.ok){
            setTitle("");
            setCategory("");
            setAuthor("");
            setPublisher("");
            setPrice(0);
            fileInput.current.value = null;
            setImage(null);
            setError("");
            setLoading(false);
           }
           if(!res.ok){
            setError(data.error);
            setLoading(false);
           }
       } catch (error) {
        setError(error.message);
        setLoading(false);
       }
  }

//   const checkForm = ()=>{
//     if(!title && !category && !author && !publisher && !price && !image){
//         setLoading(false);
//     }
//   }



    const isValidate = ()=>{
      
      return title.length>0 && category.length>0 && author.length>0 && publisher.length>0 && image && price>0 && !loading;
    }
  return (
    <div>
    <div className='flex flex-col' style={{height:"100vh"}}>
    <Navbar/>
    <div className='flex flex-1 justify-center items-center bg-slate-200' style={{height:"100vh"}}>
        <form action="" className='flex flex-col gap-4 p-12 pb-8 pt-9 bg-white ' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:10}}>
            <h1 className='text-center font-bold text-3xl'>Upload Book Details</h1>
            <input type="text" placeholder='Title' value={title} onChange={ e => setTitle(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="text" placeholder='Category' value={category} onChange={ e => setCategory(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="text" placeholder='Author' value={author} onChange={ e => setAuthor(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="text" placeholder='Publisher' value={publisher} onChange={ e => setPublisher(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="number" placeholder='Price' value={price} onChange={ e => setPrice(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
             <label htmlFor="file">Upload Book Image</label>
            <input type="file" placeholder='' id='file' onChange={(e)=>setImage(e.target.files[0])}
             ref={fileInput} />
            {error && <span className='text-red-600 text-center'>{error}</span>}
           
            <button style={{padding:4,color:"white",borderRadius:1000}} onClick={uploadBook} className={`${!isValidate()?"bg-slate-400":"bg-blue-600"}`} disabled={!isValidate()}>Upload</button>
        </form>
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default ProductForm