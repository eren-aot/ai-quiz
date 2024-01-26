import HistoryCard from '@/components/dashboard/HistoryCard'
import QuizMeCard from '@/components/dashboard/QuizMeCard'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
    title: "Dashboard || AI Quiz",
    description: "Quiz Yourself on anything",
}

const DashboardPage = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <main className='p-8 mx-auto max-w-7xl'>
            <div className='flex items-center'>
                <h2 className='mr-2 text-3xl font-bold tracking-tight'>Dashboard</h2>
            </div>
            <div className='grid gap-4 mt-4 md:grid-cols-2'>
                <QuizMeCard />
                <HistoryCard />
            </div>
        </main>
    )
}

export default DashboardPage