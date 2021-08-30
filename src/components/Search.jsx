import React, { useState } from "react";

const Search = ({ searchText, images }) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
    
    setSuggestions([]);
  };

  const onChangeHandler = async (e) => {
      setText(e.target.value);
    let matches = [];

    if (e.target.value.length > 0) {

        let res = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_PATH}&q=${e.target.value}&per_page=50`);
let data = await res.json();

matches = data.hits.filter((image) => {
    // const regex = text.toLowerCase();
    // console.log(image.tags);
    // let match = image.user.toLowerCase().match(regex);
    const regex = new RegExp(`${e.target.value}`, "gi");
    return image.tags.match(regex)
        
      });
    }

    console.log(matches);
    setSuggestions(matches);

    setText(e.target.value);
  };

  const suggestionHandler = (e) => {
    onSubmit(e);
    setText(e.target.value);
    setSuggestions([]);
  };

  return (
    <>
      <div>
      <span className="text-sm text-red-50 bg-red-400 py-1 px-3 ml-6 absolute mt-11 mr-3 -left-1.5 rounded-full item-left">galería de fotos</span>

        <form
          onSubmit={onSubmit}
          className="bg-white shadow p-4 shadow-sm py-6 "
        >
          <span className="w-auto flex justify-end items-center text-gray-500 p-2">
            <i className="material-icons text-3xl"></i>
          </span>
          <input
            autoComplete="true"
            
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className="w-3/4 rounded border-radius: 0.5rem; p-2 ml-32"
            type="text"
            placeholder="Try 'Los Angeles'"
// onBlur={()=>{
//     setTimeout(()=>{
//         setSuggestions([])
//     },100)
// }}
          ></input>

          <button
            className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 ml-4 pr-4"
            type="submit"
          >
            <p className="font-semibold text-xs">Search</p>
          </button>
          
        </form>
      </div>
      {suggestions &&
          
          <div className="overflow-y-scroll max-h-36 max-w-3/4 relative ml-2">
            {suggestions.map((suggestion) => (
              
                <div className="w-3/4 rounded border-radius: 0.5rem; p-2 ml-32">
                  <ul className="divide-y-2 divide-gray-100">
                    <li
                      key={suggestion.id}
                      className="p-3 hover:bg-blue-600 hover:text-blue-200"
                      onClick={(e) => suggestionHandler(e)}
                    >
                      {suggestion.tags}
                    </li>
                  </ul>
                </div>

              
            ))}
            </div>
}
    </>
  );
};

export default Search;
