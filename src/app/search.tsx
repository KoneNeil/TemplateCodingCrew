import { useState, Dispatch, SetStateAction } from "react";
import "./global.css";
import { SearchBar } from "./searchbar"
import { ResultsList } from "./ResultsList"

function Search() {
  const [results, setResults] = useState<any[]>([]);

  return (
    <div className="Search">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
      </div>
      <ResultsList results={results} /> 
    </div>
  );
}

export default Search;