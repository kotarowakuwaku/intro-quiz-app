"use client";

import Head from "next/head";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet" />
      </Head>

      <main
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#86B3B0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "5em",
            color: "white",
            fontFamily: "Concert+One, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
            textAlign: "center",
          }}
        >
          INTRO QUIZ
        </h1>
        <div style={{
          marginTop: "2em",
          
        }}>
          <Button label="Start" onClick={() => {
            router.push("/questionCollection");
          }} />
        </div>
      </main>
    </>
  );
}
