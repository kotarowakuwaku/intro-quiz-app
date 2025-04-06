'use client'

import React from 'react'
import { Button as MUIbutton } from '@mui/material';

const Button = ({
    label = '',
    onClick = () => {}
}: ButtonProps) => {
  return (
    <MUIbutton variant="contained" onClick={onClick}>{label}</MUIbutton>
  )
}

export default Button