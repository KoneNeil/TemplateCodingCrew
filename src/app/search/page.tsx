"use client"
import { useState, Dispatch, SetStateAction } from "react";
import { SearchBar } from "../searchbar"
import { ResultsList } from "../ResultsList"
import Link from 'next/link';
import Navbar from '../navbar';

function Search() {
  const [results, setResults] = useState<any[]>([]);

  return (
    <main>
      <Navbar />
    <div className="Search">
      <div className="mt-2">
        </div>
      <div className="search-bar-container mt-10">
        <SearchBar setResults={setResults} />
      </div>
      <ResultsList results={results} /> 
    </div>
    </main>
  );
}

export default Search;