export default function TaskFilters ({ search, setSearch, statusFilter, setStatusFilter, userFilter, setUserFilter, tasks}) {
    return (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_auto]">
            <input className="col-span-2 sm:col-span-1" type="search" placeholder="Search tasks..." aria-label="Search tasks" value={search} onChange={(event) => setSearch(event.target.value)} />
                    
            <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
            >
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <select
                aria-label="Filter by user"
                value={userFilter}
                onChange={(event) => setUserFilter(event.target.value)}
            >
                <option value="all">All users</option>
                {[...new Set(tasks.map((task) => task.userId))].map((userId) => (
                    <option key ={userId} value={userId}>
                        User {userId}
                    </option>
                ))}
            </select>
        </div>
    )
}