import React, { useEffect, useState } from 'react';
import './ResultsSearch.css';
import Link from 'next/link';
import { createClient } from "@supabase/supabase-js";

export default function ResultsSearch({ params }: { params: { id: number; result: any; } }) {
  const [model, setModel] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq('id', params.id)
        .limit(1)
        .single() 

      if (error) {
        console.error("Error fetching models:", error);
        return;
      }

      setModel(data || {});
    };

    fetchData();
  }, [params.id]);

  return (
    <div className='search-result'>
        <Link href={`/jordan/${model.id}`}>
          {model.name}
        </Link>
    </div>
  );
}
