import React from 'react'
import { ResultsSearch } from './ResultsSearch';

interface ResultsListProps {
    results: any[];
  }

  export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
            return <div><ResultsSearch result={result} key={id}/></div>;
        })}
      </div>
    );
  };
