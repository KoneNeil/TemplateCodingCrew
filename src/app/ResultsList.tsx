import React from 'react';
import ResultsSearch from './ResultsSearch';

interface ResultsListProps {
  results: any[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        return <div><ResultsSearch params={{ id : result.id, result: result }} key={result.id}/></div>;
      })}
    </div>
  );
};
