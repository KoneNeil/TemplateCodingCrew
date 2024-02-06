import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import Navbar from "../navbar";

export default async function Page({ params }: { params: { id: string } }) {
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

  const product = await supabase
    .from("products")
    .select("*, productImages(*), models(name)")
    .eq('id', params.id)
    .maybeSingle();

  console.log(JSON.stringify(product, null, 2));

  if (!product.data) {
    return <div>Product {params.id} does not exist</div>;
  }

  return (
    <main>
      <Navbar />
      <div className="relative h-45 w-90">
        <div className="absolute top-0 right-0 h-45 w-45">
          <div className="flex w-max items-end gap-4"></div>
        </div>
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <ul className="flex gap-4">
            <Link href="/jordan1lucky">
              <li>
                <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[250px]">
                  <h1>{product.data.models.name}</h1>
                  <img
                    className="w-full h-full object-cover"
                    alt={`Shoe image for product id ${product.data.id}`}
                    src={product.data.productImages[0].url}
                  />
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </main>
  );
}
