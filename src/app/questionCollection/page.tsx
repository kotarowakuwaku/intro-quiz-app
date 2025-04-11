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
            backgroundColor: "#86B3B0",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontFamily: "Concert+One, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
        }}>
            <h1
                style={{
                    fontSize: "3em",
                    color: "white",
                    textAlign: "center",
                    marginTop: "50px",
                }}>QUIZ LIST</h1>
            <div style={{ width: "100%", maxWidth: "600px" }}>
                {questionCollection.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => router.push(`/quiz/${item.id}`)}
                            style={{
                                width: "90%",
                                color: "#296F7B",
                                backgroundColor: "#FBF9E8",
                                borderRadius: "10px",
                                margin: "0.5em auto",
                                cursor: "pointer",
                                transition: "all 0.2s ease-in-out",
                                boxSizing: "border-box",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.backgroundColor = "#e8e6d8"; // 少し暗め
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FBF9E8"; // 元に戻す
                            }}
                            onMouseDown={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = "scale(0.98)";
                            }}
                            onMouseUp={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                            }}
                        >
                            <p style={{ fontSize: "2em", margin: "0.5em 1em", paddingTop: "0.5em" }}>{item.name}</p>
                            <div style={{ display: "flex", justifyContent: "flex-start", margin: "0 2em" }}>
                                <p style={{ flex: 1, margin: "0 0 1em 0" }}>{item.total} questions</p>
                                <p style={{ flex: 1, margin: "0 0 1em 0" }}>{item.introDuration} second intros</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
};

export default Page;
