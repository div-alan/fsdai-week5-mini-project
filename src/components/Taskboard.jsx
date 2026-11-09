import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import TaskFilters from "./TaskFilters.jsx";
import PageLayout from "./PageLayout.jsx"

const PUBLIC_API_URL = "https://jsonplaceholder.typicode.com/todos"

async function fetchTasks() {
    const response = await fetch(PUBLIC_API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

function Taskboard() {
    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
        staleTime: 1000 * 20,
        retry: false,
    })

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");

    if (isLoading) return <p> Loading tasks...</p>
    if (isError) {
        return <p role="alert"> Something went wrong loading tasks. Please try again</p>
    }
    if (tasks.length === 0) return <p>No tasks yet.</p>


    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
        const matchesStatus = 
            statusFilter === "all" || 
            (statusFilter === "completed" && task.completed) || 
            (statusFilter === "pending" && !task.completed);
        const matchesUser = userFilter === "all" || task.userId === Number(userFilter);

        return matchesSearch && matchesStatus && matchesUser;
    });
    const pendingTasks = filteredTasks.filter((task) => !task.completed)
    const completedTasks = filteredTasks.filter((task) => task.completed)
    const orderedTasks = [...pendingTasks, ...completedTasks] //to display pending tasks first

    return (
        <PageLayout title="Taskboard" activePage="tasks">
                
                <TaskFilters
                    search={search}
                    setSearch={setSearch}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    userFilter={userFilter}
                    setUserFilter={setUserFilter}
                    tasks={tasks}
                />


                <section className="flex flex-col gap-2">
                    {orderedTasks.length === 0 && <p>No tasks match your search or filters.</p>}
                    {orderedTasks.map((task) => (
                        <article key={task.id} className="flex items-center gap-4 rounded-xl border border-[#E8DDCC] bg-[#FFFCF7] p-4">
                            <Link to={`/tasks/${task.id}`} className="min-w-0 flex-1 font-semibold text-[#59634A]">
                                <h2>{task.title}</h2>
                            </Link>
                            <p className="shrink-0 whitespace-nowrap rounded-full bg-[#E8DDCC] px-3 py-1 text-sm font-semibold text-[#66513F]">User {task.userId}</p>
                            <p className={`shrink-0 rounded-full px-3 py-1 text-center text-sm font-semibold
                                ${
                                    task.completed
                                        ? "bg-[#E1E6D7] text-[#414D32]"
                                        : "bg-[#F2DFD3] text-[#8F422B]"
                                }`}
                            >
                                {task.completed ? "Completed" : "Pending"}
                            </p>
                        </article>
                    ))}
                </section>
        </PageLayout>
    )
}

export default Taskboard