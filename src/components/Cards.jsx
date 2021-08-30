import React from 'react'

const Cards = ({image}) => {

const tags = image.tags.split(',');


    return (
        <>
        
     <div className="max-w-sm flex shadow-sm py-6 grid-cols-3 gap-4 justify-center items-center">
  <div className="w-80 rounded-xl border-radius: 0.125rem; max-w-xs cursor-pointer overflow-hidden hover:shadow-sm transform hover:scale-105 duration-500">
    <img className="object-contain" src={image.webformatURL} alt="" />
    <div className="p-4 bg-white rounded-xl border-radius: 0.125rem;" >
      <span className="text-sm font-semibold text-red-50 bg-red-400 py-1 px-3 ml-6 rounded-full item-left">Likes : {image.likes}</span>
      <span className="text-sm font-semibold text-red-50 bg-red-400 py-1 px-3 ml-12 rounded-full item-right">Views : {image.views}</span>
      <h1 className="mt-4 font-bold text-xl px-6 py-4">Photo by {image.user}</h1>
      {tags.map(tag => (      <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 m-1 ">#{tag}</span>
))}
    </div>
  </div>
</div>
    
        </>
    )
}

export default Cards
