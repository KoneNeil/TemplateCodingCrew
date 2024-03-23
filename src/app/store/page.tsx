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
    <main className="bg-gray-100 min-h-screen">
      <Navbar />
      <h1 className="text-5xl mb-8 text-center text-gray-800 font-sans mt-14">All Products</h1>
      <div className="flex flex-wrap justify-center items-center mt-4">
        {models?.data?.map((model: any) => (
          <Link key={model.id} href={`/jordan/${model.id}`}>
            <div className="rounded-lg overflow-hidden bg-white shadow-md p-4 text-center m-4 transition-transform transform hover:scale-105">
              <div className="mb-3">
                <p className="text-lg font-semibold">{model.name}</p>
                <p className="flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-500">${model.price}</span>
                  {model.oldprice && (
                    <span className="text-sm text-gray-500 ml-2 line-through">
                      ${model.oldprice}
                    </span>
                  )}
                </p>
              </div>
              <img className="w-full h-40 object-cover mb-4" src={model.imageUrl} alt={model.name} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}