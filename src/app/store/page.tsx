import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from 'next/link';
import Navbar from '../navbar';
import React from "react"

export default async function Store({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const models = await supabase
    .from("models")
    .select("*")
    .eq('typeid', params.id);

  console.log(models.data);

  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-semibold mb-8 justify-center flex flex-wrap mt-8">Products</h1>
      <ul className="flex gap-4">
            {models.data?.map((model: any) => (<Link key={model.typeid} href="/">
              <li>
                <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[250px]">
                {model.name}
                <img className="w-full h-full object-cover" src={model.imageUrl} alt={model.name} /> 
                </div>
              </li>
            </Link>)
            )}
          </ul>
    </main>
  );
}
