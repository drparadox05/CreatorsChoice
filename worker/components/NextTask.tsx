"use client"
import axios from "axios";
import { useEffect, useState } from "react"

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;
if (!NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in .env");
}

interface Task {
    "id": number,
    "amount": number,
    "title": string,
    "options": {
        id: number;
        image_url: string;
        task_id: number
    }[]
}

// CSR
export const NextTask = () => {
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${NEXT_PUBLIC_BACKEND_URL}/v1/worker/nextTask`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setCurrentTask(res.data.task);
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                setCurrentTask(null)
            })
    }, [])
    
    if (loading) {
        return <div className="h-screen flex justify-center flex-col">
            <div className="w-full flex justify-center text-2xl">
                Loading...
            </div>
        </div>
    }

    if (!currentTask) {
        return <div className="h-screen flex justify-center flex-col">
            <div className="w-full flex justify-center text-2xl">
                Please check back in some time, there are no pending tasks at the moment
            </div>
        </div>
    }

    return <div>
        <div className='text-2xl pt-20 flex justify-center'>
            {currentTask.title}
            <div className="pl-4">
                {submitting && "Submitting..."}
            </div>
        </div>
        <div className='flex justify-center pt-8'>
            {currentTask.options.map(option => <Option onSelect={async () => {
                setSubmitting(true);
                try {
                    const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/v1/worker/submission`, {
                        taskId: currentTask.id.toString(),
                        selection: option.id.toString()
                    }, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    });
    
                    const nextTask = response.data.nextTask;
                    if (nextTask) {
                        setCurrentTask(nextTask)
                    } else {
                        setCurrentTask(null);
                    }
                } catch(e) {
                    console.log(e);
                }
                setSubmitting(false);

            }} key={option.id} imageUrl={option.image_url} />)}
        </div>
    </div>
}

function Option({imageUrl, onSelect}: {
    imageUrl: string;
    onSelect: () => void;
}) {
    return <div>
        <img onClick={onSelect} className={"p-2 w-96 rounded-md"} src={imageUrl} />
    </div>
}