"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../navbar';
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import SneakersList from '../duneComponent';


export default async function Page({ params }: { params: { id: string } }) {
    const cookieStore = cookies();
    const targetId = "4";

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
        .eq('id', targetId)

    return (
        <main>
            <Navbar />
            {models?.data?.map((model: any) => (
                <img src={model.imageUrl} alt={model.name} />
            ))}
            <SneakersList />
        </main>
    );
};
