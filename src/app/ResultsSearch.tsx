import React, { useEffect, useState } from 'react';
import './ResultsSearch.css';
import Link from 'next/link';
import { createClient } from "@supabase/supabase-js";

export default function ResultsSearch({ params }: { params: { id: number; result: any; } }) {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq('id', params.id);

      if (error) {
        console.error("Error fetching models:", error);
        return;
      }

      setModels(data || []);
    };

    fetchData();
  }, [params.id]);

  return (
    <div className='search-result'>
      {models.map((model: any) => (
        <Link href={`/jordan/${model.id}`} key={model.id}>
          {model.name}
        </Link>
      ))}
    </div>
  );
}
