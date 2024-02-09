import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from 'next/link';
import Navbar from '../navbar';
import React from "react"

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
    .select("*, imageUrl, name, price(prix)")
    .range(0, 2)

  console.log(models.data);


  return (
    <main>
      <Navbar />
      <h1 className="text-3xl font-semibold mb-8 justify-center flex flex-wrap mt-8">Products</h1>
      <ul className="flex flex-wrap gap-4 justify-center mt-8">
        {models.data?.map((model: any) => (
          <Link href={`/${model.id}`} key={model.id}>
            <h1>{model.price?.prix}</h1>
            <li className="mb-8">
              <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[300px] p-4">
                <img
                  className="w-full h-3/4 object-cover mb-4"
                  alt={`Shoe image for product id ${model.id}`}
                  src={model.imageUrl && model.imageUrl[0]?.url}/>
                <h1 className="text-lg font-semibold">{model.name}</h1>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
