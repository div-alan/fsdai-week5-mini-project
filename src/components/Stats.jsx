import { useQuery } from"@tanstack/react-query"
import PageLayout from "./PageLayout"

async function fetchTasks() {
    const response = await fetch (`https://jsonplaceholder.typicode.com/todos`)
    if (!response.ok) throw new Error (`API responded ${response.status}`)
    
    return response.json()
}

function Stats() {
    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
        //staleTime: 1000 * 20,
        retry: false,
    })

    if (isLoading) return <p> Loading stats...</p>
    if (isError) {
        return <p role="alert"> Something went wrong loading stats. Please try again</p>
    }
    if (tasks.length === 0) return <p>No tasks yet.</p>

    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completed).length
    const pendingTasks = totalTasks - completedTasks

    const userIds = [...new Set(tasks.map((task) => task.userId))];
    const userProgress = userIds.map((userId) => {
        const userTasks = tasks.filter((task) => task.userId === userId);
        const total = userTasks.length;
        const completed = userTasks.filter((task) => task.completed).length;
        const percentage = Math.round((completed / total) * 100);

        return { userId, total, completed, percentage };
    });

    const rankedUsers = [...userProgress].sort((a, b) => b.percentage - a.percentage);
    
    return (
        <PageLayout title="Overview" activePage="stats">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-xl border border-[#E8DDCC] p-6 bg-[#FFFCF7]">
                    <p className="font-semibold">Total </p>
                    <p className="mt-2 text-4xl font-bold">{totalTasks}</p>
                </article>
                <article className="rounded-xl border border-[#E8DDCC] p-6 bg-[#E1E6D7]">
                    <p className="font-semibold">Completed tasks </p>
                    <p className="mt-2 text-4xl font-bold">{completedTasks}</p>
                </article>
                <article className="rounded-xl border border-[#E8DDCC] p-6 bg-[#E9D3C5]">
                    <p className="font-semibold">Pending tasks </p>
                    <p className="mt-2 text-4xl font-bold">{pendingTasks}</p>
                </article>
            </section>

            <section className="mt-8 rounded-xl border border-[#E8DDCC] bg-[#FFFCF7] p-6">
                <h2 className="mb-6 text-xl font-semibold">Leaderboard</h2>

                <div className="space-y-5"> {rankedUsers.map((user) => (
                        <div key={user.userId}>
                            <div className="mb-2 flex justify-between gap-4 text-sm font-semibold">
                                <span>User {user.userId}</span>
                                <span>{user.percentage}%</span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-[#E8DDCC]">
                                <div
                                    className="h-full rounded-full bg-[#59634A]"
                                    style={{ width: `${user.percentage}%` }}
                                />
                            </div>

                            <p className="mt-1 text-sm">
                                {user.completed} / {user.total} completed
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </PageLayout>
    );
}

export default Stats;