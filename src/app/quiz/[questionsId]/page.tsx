"use client";

import { useEffect, useState } from "react";
import Quiz from "@/app/components/Quiz";
import { createClient } from "@/utils/supabase/client";
import Button from '@/app/components/Button';
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function Page() {
    const [questions, setQuestions] = useState<
        {
            videoId: string;
            value: string;
            correctAnswer: string | null;
            answer: string | null;
        }[]>
        ([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true); // ← ここに移動
            const { data, error } = await supabase
                .from('quiz')
                .select('*');

            if (error) {
                console.error(error);
            } else {
                const shuffled = [...data].sort(() => Math.random() - 0.5);
                setQuestions(
                    shuffled.slice(0, 5).map((item) => ({
                        videoId: item.youtubeId ?? "",
                        value: "",
                        correctAnswer: item.name,
                        answer: item.answer,
                    }))
                );
            }
            setIsLoading(false); // ← 非同期処理の後にする
        };

        getPosts();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
            {questions.length > 0 && questions.map((item, index) => {
                return (
                    <div key={item.videoId} style={{ display: "flex", justifyContent: "center", width: "60%" }}>
                        <Quiz title={`${index + 1}問目`} videoId={item.videoId} introDuration={5} id={index} value={item.value} onChange={(newValue) => {
                            const newquestions = [...questions];
                            newquestions[index].value = newValue;
                            setQuestions(newquestions);
                        }} />
                    </div>
                )
            })}
            <Button label="結果を見る" onClick={() => {
                console.log(questions);
                localStorage.setItem("quizResults", JSON.stringify(questions));
                router.push("/result");
            }} />
        </main>
    );
}

