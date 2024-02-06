import React from 'react'
import './ResultsSearch.css';
import Link from 'next/link';

export const ResultsSearch = ({result}: {result: any}) => {
  return (
    <div className='search-result'>
    <Link href="jordan1sky">
      {result.name}
    </Link>
    </div>
  )
}