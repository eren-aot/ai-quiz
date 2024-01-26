import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'


export default function Home() {
  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle>Welcome to Quizzzy 🔥!</CardTitle>
          <CardDescription>Quizzzy is a platform for creating quizzes using AI!. Get started by
            loggin in below!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Sign In with Google</Button>
        </CardContent>
       
      </Card>

    </div>
  )
}
