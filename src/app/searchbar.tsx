import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import "./SearchBar.css"
import { createClient } from '@supabase/supabase-js'


export const SearchBar = ({setResults}: {setResults: any}) => {
    const [input, setInput] = useState("");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

const Data = async (value: React.SetStateAction<any>) => {
  let { data, error } = await supabase
    .from('models')
    .select('name')
    .filter('name', 'ilike', `%${value}%`)

  if (error) console.error(error)
  else setResults(data)
}
  
    const handleChange = (value: React.SetStateAction<any>) => {
        setInput(value);
        Data(value);
    }


  return (
    <div className='input-wrapper'>
    <FaSearch id="search-icon"/>
    <input 
    placeholder='Chercher un produit' 
    value={input} 
    onChange={(e) => handleChange(e.target.value)} />
    </div>
  )
}
