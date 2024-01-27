"use client";
import React from "react";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Props = {
    topic: string;
};

type Input = z.infer<typeof quizCreationSchema>

const QuizCreation = ({ topic: topicParams }: Props) => {
    const router = useRouter();
    const [showLoader, setShowLoader] = React.useState(false);
    const [finsishedLoading, setFinishedLoading] = React.useState(false);
    const { toast } = useToast();
    // const {mutate: getQuestions,isLoading} =useMutation({
    //     mutationFn: async (topic: string) => {
    // })

    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            topic: topicParams,
            type: "mcq",
            amount: 3,
        }
    })
    const onSubmit = async (data: Input) => {

        console.log(data);
    }

    form.watch();

    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                    <CardDescription>Create a quiz for</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Choose a topic" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide any topic you would like to be quizzed on here
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Questions</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="How many question??"
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue("amount", parseInt(e.target.value))
                                                }}
                                                min={1}
                                                max={10}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can choose how many questions you would like to be quizzed on here.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between">
                                <Button
                                    variant={
                                        form.getValues("type") === "mcq" ? "default" : "secondary"
                                    }
                                    className="w-1/2 rounded-none rounded-l-lg"
                                    onClick={() => {
                                        form.setValue("type", "mcq");
                                    }}
                                >
                                    <CopyCheck className="h-4 w-4 mr-2" />Mutiple Choices
                                </Button>
                                <Separator orientation="vertical"/>
                                <Button
                                    variant={
                                        form.getValues("type") === "open_ended" ? "default" : "secondary"
                                    }
                                    className="w-1/2 rounded-none rounded-l-lg"
                                    onClick={() => {
                                        form.setValue("type", "open_ended");
                                    }}
                                >
                                    <CopyCheck className="h-4 w-4 mr-2" />Open Ended
                                </Button>
                            </div>
                            <Button type="submit" >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuizCreation