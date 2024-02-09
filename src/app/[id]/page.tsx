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
    <main>
      <Navbar />
      <div className="relative h-45 w-90">
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <ul className="flex gap-4">
            {models.data.map((model: any) => (<Link key={model.id} href="/">
              <li>
                <div className="rounded-lg overflow-hidden bg-red-200 w-[250px] h-[250px]">
                  {model.name}
                  <img className="w-full h-full object-cover" src={model.imageUrl} alt={model.name} />
                </div>
              </li>
            </Link>)
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
