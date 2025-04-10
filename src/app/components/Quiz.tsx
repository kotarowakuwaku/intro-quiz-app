'use client'
import React from 'react'
import YoutubePlayer from './YoutubePlayer'
import TextInput from './TextInput'
import { YoutubePlayerProps } from '@/types/youtubePlayerProps';
import { TextInputProps } from '@/types/textInputProps';

type QuizProps = {
    title: string;
} & YoutubePlayerProps & TextInputProps;

const Quiz = ({ title, videoId, introDuration, id, value, onChange }: QuizProps) => {
    return (
        <>
        <div style={{position:"relative", width:"100%", border:"1px solid black", padding:"1em 0.5em 0.5em 0.5em", borderRadius:"10px", margin:"1em"}}>
            <span style={{position:"absolute", top:0, left:0, fontSize:"1em", padding:"0 1em", margin:0, transform:"translateY(-50%) translateX(1em)", backgroundColor:"white"}}>{title}</span>
            <div style={{ display: "flex", justifyContent: "flex-start", width: "100%"}}>
                <YoutubePlayer key={videoId} videoId={videoId} introDuration={introDuration} />
                <div style={{margin:"0 10px"}}></div>
                <TextInput id={id} value={value} onChange={onChange} />
            </div>
        </div>
        </>
    )
}

export default Quiz