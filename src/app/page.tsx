"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
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
          width:"200px",
          height:"50px",
        }}>
          <Button label="Start" fontSize="1.5rem" onClick={() => {
            router.push("/questionCollection");
          }} />
        </div>
      </main>
    </>
  );
}
