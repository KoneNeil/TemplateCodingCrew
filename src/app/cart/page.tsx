"use client";
import { useCookies } from "react-cookie";
import { createServerClient } from "@supabase/ssr";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import Link from "next/link";

const Cart = ({ params }: { params: { id: string } }) => {
  const [cookies, setCookie] = useCookies();
  const targetId = params.id;
  const [model, setModel] = useState<any | null>(null);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies[name];
        },
      },
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: modelData, error: modelError } = await supabase
        .from("models")
        .select("*")
        .eq('id', targetId)
        .single();

      if (modelData) {
        setModel(modelData);
      } else {
        console.error("Error fetching model:", modelError);
      }
    };

    fetchData();
  }, [targetId]);


  return (
    <main>
      <Navbar />
      <div className="mt-16">
        <h1>Votre panier</h1>
      </div>
      <div>
        <Link href="/store">Continuez votre shopping</Link>
        <br />
        <Link href="/commande">Passer en caisse</Link>
      </div>
    </main>
  );
};

export default Cart;

