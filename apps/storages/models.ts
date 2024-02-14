export type Task = {
    id: number;
    task: string;
    created_at: string;
};

export type UserTasks = {
    todo: Task[],
    archived: Task[],
};
