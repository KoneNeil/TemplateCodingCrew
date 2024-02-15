import { createServerClient, type CookieOptions } from "@supabase/ssr";
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
    .range(0, 2);

  return (
    <main className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap gap-8">
          {products.data?.map((product) => (
            <Link href={`/${product.typeid}`} key={product.id}>
              <div className="rounded-lg overflow-hidden bg-white shadow-md p-4 transition-transform transform hover:scale-105 text-center">
                <h1 className="text-xl font-semibold mb-4">{product.types.name}</h1>
                <div className="flex justify-center items-center h-72">
                  <img
                    className="object-cover max-w-full max-h-full"
                    alt={`Shoe image for product id ${product.id}`}
                    src={product.productImages[0]?.url}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
