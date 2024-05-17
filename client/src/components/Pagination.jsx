import React, { useEffect, useState } from 'react'

const Pagination = ({totalPages,currentPage}) => {
  const [pages, setPages] = useState([]);
  let p = [];
  for(let i=1; i<=totalPages; i++){
    p.push(i);
  }
  useEffect(()=>{
    setPages(p);
  },[pages]);
console.log("pagination pages = ",pages)
  return (
    <div>
        {pages.map((page)=>{
          <button className='bg-red-400' key={page}>1</button>
        })}
    </div>
  )
}

export default Pagination