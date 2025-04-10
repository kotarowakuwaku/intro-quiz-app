'use client'
import React from 'react'
import TextField from '@mui/material/TextField';
import { TextInputProps } from '@/types/textInputProps';

const TextInput = ({ id, value, onChange }: TextInputProps) => {
    return (
        <>
            <TextField id={id.toString()} label="回答欄" variant="outlined" value={value} onChange={(e) => onChange(e.target.value)} fullWidth
                sx={{
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                }} />
        </>
    )
}

export default TextInput