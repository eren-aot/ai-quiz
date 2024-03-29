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
import SignInButton from '@/components/SignInButton'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';


export default async function Home() {

  const session = await getServerSession();
  console.log(session)
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle>Welcome to Quizzzy 🔥!</CardTitle>
          <CardDescription>Quizzzy is a platform for creating quizzes using AI!. Get started by
            loggin in below!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text={"Sign in with Google"} />
        </CardContent>
       
      </Card>

    </div>
  )
}
