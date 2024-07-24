"use client"

import Navbarmain from "./components/navbarmain";
import Maincontent from "./components/maincontent";
import Community from "./components/community";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/myfile')
    };
  }, [session], [router])
  return (
    <div>
      <Navbarmain />
      <div className="my-24 md:my-36">
        <Maincontent />
        <Community />
      </div>
    </div>
  );
}
