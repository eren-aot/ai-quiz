"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

type Props = { text: string }

const SignInButton = ({ text }: Props) => {
    return (
        <Button>
            {text}
        </Button>
    )
}

export default SignInButton