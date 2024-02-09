import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from 'next/link';
import Navbar from '../navbar';
import React from "react";

export default async function Store() {
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
    .select("*");

  console.log(models.data);

  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-semibold mb-8 justify-center flex flex-wrap mt-8">Products</h1>
      <ul className="flex flex-wrap gap-4 justify-center mt-8">
        {models?.data?.map((model: any) => (
          <Link key={model.id} href="/jordan1sky">
            <li>
              <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[300px] p-4">
                <div className="mb-3 text-center">{model.name}</div>
                <img className="w-full h-5/6 object-cover mb-4" src={model.imageUrl} alt={model.name} />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
