import { Link, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import PageLayout from "./PageLayout";



async function fetchTask(id) {
    const response = await fetch (`https://jsonplaceholder.typicode.com/todos/${id}`)
    if(response.status === 404) return null;
    if (!response.ok) throw new Error (`API responded ${response.status}`)
    const data = await response.json(); 
    if (!data) return null
    return{
        id: data.id,
        title: data.title,
        completed: data.completed,
        userId: data.userId,
    }
}

function TaskDescription() {
    const { id } = useParams();
    const { data : task, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['task', id],
        queryFn: () => fetchTask(id),
        retry: false,
    })

  return (
    <PageLayout title="Task details"  showNav={false}>
        <Link to="/" className="mb-6 inline-block text-[#59634A]">← Back to list</Link>
        {isLoading && <p>Loading task...</p>}
        {isError && (
            <p role="alert">Something went wrong loading this task. Please try again.</p>
        )}
        {isSuccess && !task && <p>Task not found.</p>}
        {task && (
            <article className="rounded-xl border border-[#E8DDCC] bg-[#FFFCF7] p-6">
                <h2 className="mb-4 text-2xl font-semibold">{task.title}</h2>
                <p className={`shrink-0 rounded-full px-3 py-1 text-center text-sm font-semibold inline-block
                    ${
                        task.completed
                            ? "bg-[#E1E6D7] text-[#414D32]"
                            : "bg-[#F2DFD3] text-[#8F422B]"
                    }`}
                >
                    {task.completed ? "Completed" : "Pending"}
                </p>
                <p className="mt-6 border-t border-[#E8DDCC] pt-4">Assigned user: User {task.userId}</p>
            </article>
        )}

    </PageLayout>
  );
}

export default TaskDescription;
