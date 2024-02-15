export type Task = {
    id: string;
    task: string;
    created_at: string;
};

export type UserTasks = {
    todo: Task[],
    archived: Task[],
};
