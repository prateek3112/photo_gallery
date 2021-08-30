import React, { useState,useEffect } from 'react';
import Cards from './components/Cards';
import Search from './components/Search';

import './App.css';

function App() {
  const [images,setImages] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [term,setTerm] = useState('');

useEffect(()=>{
  async function apiCall(){
  
    let res = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_PATH}&q=${term}&per_page=50`);
    let data = await res.json();
    
    if(data.length!==0){
      setImages(data.hits);
    setIsLoading(false);
    }
    
    }
    apiCall();
},[term])
  return (
    <>
   <div className="container mx-auto">
     <Search searchText = { (text) => setTerm(text)} images={images} />
     { isLoading ? <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
</div> :
       <div className="grid grid-cols-3 gap-4">
       {images && images.map((image) =>{
         return <Cards key={image.id} image={image}/>
       })}
     </div>
     }
   </div>
    </>
  );
}

export default App;
