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

  const models = await supabase
    .from("models")
    .select("*")
    .eq('typeid', params.id);

  console.log(models.data);

  if (!models.data) {
    return <div>Model {params.id} does not exist</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-wrap gap-8">
          {models.data.map((model: any) => (
            <Link key={model.id} href="/">
              <div className="rounded-lg overflow-hidden bg-white shadow-md p-4 transition-transform transform hover:scale-105 text-center">
                <h1 className="text-xl font-semibold mb-4">{model.name}</h1>
                <div className="flex justify-center items-center h-72">
                  <img
                    className="object-cover max-w-full max-h-full"
                    alt={model.name}
                    src={model.imageUrl}
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
