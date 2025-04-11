'use client'
import React from 'react'
import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@/app/components/Button';

const Page = () => {
    const [score, setScore] = useState(0);
    const [results, setResults] = useState<
        {
            videoId: string;
            value: string;
            correctAnswer: string | null;
            answer: string | null;
        }[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("quizResults");
        if (stored) {
            const parsed = JSON.parse(stored);
            console.log(parsed);
            setResults(parsed);
            const correctAnswers = parsed.filter((item: {
                videoId: string;
                value: string;
                correctAnswer: string | null;
                answer: string | null;
            }) => item.value === item.correctAnswer || item.value === item.answer).length;
            setScore(correctAnswers);
            console.log(correctAnswers);
        }
    }, []);

    return (
        <>
            <main style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <h1 style={{fontSize:"2rem"}}>結果</h1>
                <p style={{fontSize:"1.25rem"}}>{results.length}問中 <span style={{color:"red", fontSize:"2rem"}}>{score}問 正解！</span></p>
                <div style={{ width: "100%", maxWidth: "600px" }}>
                    {results.map((item, index) => {
                        return (
                            <div key={index} style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black", padding: "1em 0.5em", borderRadius: "10px", margin: "1em" }}>
                                <p style={{ flex: 1, textAlign: "center" }}>{index + 1}.　
                                    {item.value === item.correctAnswer || item.value === item.answer
                                        ? <span style={{ color: "red" }}><CheckIcon /></span>
                                        : <span style={{ color: "blue" }}><ClearIcon /></span>
                                    }</p>
                                <div style={{ flex: 5, textAlign: "center" }}>
                                    <p><span style={{color:"red"}}>正解:</span> {item.correctAnswer}({item.answer})</p>
                                    <p>あなたの回答: {item.value}</p>
                                </div>
                                {/* <p style={{ flex: 1, textAlign: "center" }}>{item.videoId}</p> */}
                            </div>
                        )
                    })}
                </div>
                <Button label="クイズ一覧に戻る" onClick={() => {
                    localStorage.clear();
                    window.location.href = "/questionCollection";
                }} />

            </main>
        </>
    )
}

export default Page