"use client"

import Navbarmain from "./components/navbarmain";
import Maincontent from "./components/maincontent";
import Community from "./components/community";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./components/loader";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [statusLoad, setStatusLoad] = useState(true)
  useEffect(() => {
      setStatusLoad(false)
  }, [])


  useEffect(() => {
    if (session) {
      router.replace('/myfile')
    };
  }, [session], [router])
  return (
    <div>
      <Navbarmain />
      <div className="mt-20 md:mt-36">
        <Maincontent />
        <Community />
      </div>
      <div id="loader" style={{ opacity: statusLoad ? "1" : "0", display: statusLoad ? "" : "none" }}>
        <Loader />
      </div>
    </div>
  );
}
