'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const Page = () => {
  const router = useRouter();

  const [questionCollection, setQuestionCollection] = React.useState<
    {
      id: number;
      name: string;
      total: number;
      introDuration: number;
    }[]
  >([]);

  useEffect(() => {
    const getQestionCollection = async () => {
      const { data, error } = await supabase
        .from('questionCollection')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setQuestionCollection(
          data.map((item) => ({
            id: item.id,
            name: item.name ?? "",
            total: item.number_of_questions ?? 0,
            introDuration: item.introDuration ?? 0,
          }))
        );
      }
    };
    getQestionCollection();
  }, []);

  return (
    <main style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <h1 style={{ fontSize: "2rem" }}>クイズ一覧</h1>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        {questionCollection.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => router.push(`/quiz/${item.id}`)}
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1em 0.5em",
                border: "1px solid black",
                outline: "2px solid transparent",
                outlineOffset: "-1px",
                borderRadius: "10px",
                margin: "1em auto",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = "#F6FAFD";
                el.style.border = "1px solid #1976D2";
                el.style.outlineColor = "#1976D2";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = "white";
                el.style.border = "1px solid black";
                el.style.outlineColor = "transparent";
              }}
              
              onMouseDown={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              }}
            >
              <p style={{ flex: 1, textAlign: "center" }}>{index + 1}.　{item.name}</p>
              <p style={{ flex: 2, textAlign: "center" }}>問題数：{item.total}問</p>
              <p style={{ flex: 1, textAlign: "center" }}>{item.introDuration}秒</p>
            </div>
          )
        })}
      </div>
    </main>
  );
};

export default Page;
