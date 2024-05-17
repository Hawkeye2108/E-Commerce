import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useCartContext } from '../hooks/useCartContext'
import { Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

function Collection() {
  const {email,cart,dispatch} = useCartContext();
  const [products,setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [enter, setEnter] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
//   const [category, setCategory] = useState("");
const fetchAllProducts = async ()=>{
    try{
        setLoading(true);
        // const res = await fetch("https://e-commerce-1-p1gt.onrender.com/api/product");
        // const res = await fetch(`https://e-commerce-1-p1gt.onrender.com/api/product?title=${search}`);
        const res = await fetch(`http://localhost:4000/api/product?title=${search}&page=${currentPage}`)
        // console.log(res)
        if(res.ok){
        const data = await res.json();
        // console.log("data gathering")
        // console.log(data)
        console.log("data = ",data);
        setProducts(data.data);
        let p = [];
            for(let i=1; i<=data.totalPages; i++){
                p.push(i);
            }
            setPages(p);
        // setTotalPages(data.totalPages);
            
        }
        else{
            setProducts([]);
        }
        // setSearchData([]);
        setLoading(false);
    }
    catch(error){
        console.log(error);
    }
}
  useEffect(()=>{
     fetchAllProducts();
    },[currentPage]);

    useEffect(()=>{
        // console.log("useEffect search = ",search);
        // console.log("useEffect enter = ",enter);
        const handleSearchData = async()=>{
        if(search!=="" && enter === false){
            try {
                // const res = await fetch(`https://e-commerce-1-p1gt.onrender.com/api/product?title=${search}`)
                const res = await fetch(`http://localhost:4000/api/product?title=${search}`)
                if(res.ok){
                    const data = await res.json();
                    cosnole.log("data = ",data);
                    setSearchData(data);
                }
                else{
                  setSearchData([]);
                }
                    
            } catch (error) {
                // console.log(error);
                // console.log("Error occured setSerachData([])");
                setSearchData([]);
            }
        }
        else{
            setSearchData([]);
        } 
        
    }   
    handleSearchData();
        
    },[search]);


    // console.log("loading = ",loading);



    const logOut = ()=>{
        localStorage.removeItem("user");
        dispatch({type:"LOGOUT"})
    }

    // const styles = {
    //     container: {
    //     //   backgroundColor: 'lightblue',
    //     //   padding: '20px',
    //     //   textAlign: 'center',
    //     //   padding:"20px 60px",
    //       '@media (min-width: 400px)': {
    //         backgroundColor: 'green',
    //         gridTemplateColumns: "1fr 1fr"
    //       }
    //     }
    //   };
    const handleSearchClick = (title)=>{
        console.log("Pressed Enter = ",searchData[selectedItem]);
                setEnter(true);
                setSearch(title);
                fetchAllProducts();
                setSearchData([]);
                console.log("Mouse Clicked = ",search);
    }
    const handleSearch = (e)=>{
        setEnter(false);
        setSearch(e.target.value);
        // console.log("search = ",search);
    }
    const handleKeyDown = (e)=>{
        // console.log(e.key)
        // console.log("searchData.length = ",searchData.length)
        if(search===""){
            // console.log(e.key,"clear all");
            setSearchData([]);
        }
        
        if(selectedItem < searchData.length){
            if(e.key === "ArrowUp" && selectedItem>0){
                setSelectedItem(prev => prev-1);
            }
            else if(e.key === "ArrowDown" && selectedItem<searchData.length-1){
                setSelectedItem(prev => prev+1);
            }
            else if(e.key === "Enter" && selectedItem>=0){
                // console.log("Pressed Enter = ",searchData[selectedItem]);
                setEnter(true);
                setSearch(searchData[selectedItem].title);
                fetchAllProducts();
                setSearchData([]);
            }
            
        }
        else{
            setSelectedItem(-1);
        }

    }
   
    console.log("Products.map = ",products);
    // console.log("pages = ",pages)
   
  return (
    <>
    <Navbar/>

    <div className='flex items-center m-4 '>
        <div className='flex flex-col  items-center flex-1 relative '>
        <input className="p-2 rounded-full w-1/2 px-6 bg-white text-black border-blue-300 border-2 outline-none" type="text" placeholder='Search' value={search} onChange={handleSearch} onKeyDown={handleKeyDown}/>
        <div className='w-1/2 px-4 absolute top-full'>
            {searchData?.map((data,index)=>{   
                return <div key={index} className={`cursor-pointer hover:bg-white px-4 py-1 ${selectedItem===index?"bg-white":"bg-blue-100"}`} onclick={()=>handleSearchClick(data.title)} 
                onMouseDown={()=>{
                    
                    handleSearchClick(data.title)}}
                >{data.title}</div>
            })}
        </div>
        </div>



        {/* <div className=''>
        <select className='border-blue-300 border-2 rounded-full p-1' name="" id="">
            <option value={category}>1st Year</option>
            <option value={category}>2nd Year</option>
            <option value={category}>3rd Year</option>
            <option value={category}>4th Year</option>
            <option value={category}>Competitive Exam</option>
        </select>
    </div> */}
    </div>
    
    {/* Collection */}
    <div className='min-h-screen'>
        {/* Cards */}
        {/* <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px",width:"100%", backgroundColor:"yellow"}}> */}
           {/* {products && products.map((item)=>{
            return(
            <Card key={item._id} item={item}/>
            )
           })} */}
        {/* </div> */}
       
        {/* Next Collection */}
        <div className='w-full h-full p-5 justify-center md:justify-around' style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,300px)",gap:"30px"}}>
            
            {!loading && products.length!=0 && 
            
            products?.map((item)=>{
            return(   
            <Card key={item._id} item={item}/>
            )
           })}
           {/* <h1>Pages</h1> */}
           {/* <Pagination totalPages={totalPages}/> */}
           
           
           </div>
           <div>
           <ul className='flex justify-center gap-4 my-6'>
           { !loading && products.length!=0 &&
             pages.map((page)=>{
                return(
                    <button key={page} className={`cursor-pointer font-bold py-1 px-2 rounded-md ${(page===currentPage)?"bg-red-500":" bg-slate-300"}`} onClick={()=>setCurrentPage(page)} >{page}</button>
                )
             })  
           }
           </ul>
           </div>
           {/* </div> */}
           {!loading && products?.length===0 && 
              <div className='flex justify-center'>
                <h1 className='font-bold text-2xl'>No item found</h1>
              </div>
            }
           {loading && 
           <div className='flex justify-center mt-6'>
           <Loader></Loader>
           </div>
           }
    </div>
    {/* <div className='relative bottom-0 w-full'> */}
    <Footer/>
    {/* </div> */}
    </>
  )
}

export default Collection