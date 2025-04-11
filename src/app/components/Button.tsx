'use client'

import React from 'react'
import { Button as MUIbutton } from '@mui/material';

const Button = ({
    label = '',
    fontSize = '1rem',
    onClick = () => {}

}: ButtonProps) => {
  return (
    <MUIbutton sx={{
      color: "#396E71",
      backgroundColor: "#E7C87D",
      width: "100%",
      height: "100%",
      fontSize: fontSize,
    }} variant="contained" onClick={onClick}>{label}</MUIbutton>
  )
}

export default Button