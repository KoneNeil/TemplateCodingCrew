import { createServerClient, type CookieOptions } from "@supabase/ssr";
import Image from "next/image";
import { cookies } from "next/headers";
import Navbar from "./navbar";
import Link from 'next/link';


export default async function Home() {
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


  const products = await supabase
    .from("products")
    .select("*, productImages(*), types(name)")
    .range(0, 2)

  return (
    <main>
      <Navbar />
      <div className="relative h-45 w-90">
        <div className="absolute top-43 right-0 h-45 w-45">
          <div className="flex w-max items-end gap-4">
          </div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <ul className="flex gap-4">
          {products.data?.map((product) => (
            <Link href={`/${product.id}`} key={product.id}>
              <li>
                <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[250px]">
                  <h1>{product.types.name}</h1>
                  <img className="w-full h-full object-cover"
                    alt={`Shoe image for product id ${product.id}`}
                    src={product.productImages[0]?.url} />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}