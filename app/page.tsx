import { Suspense } from "react";
import TaskList from "./_components/TaskList";
import { getClickUpTasks, getClickUPList } from "@/lib/clickup";

export default async function TasksPage() {
  const list = await getClickUPList();
  const tasks = await getClickUpTasks();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ClickUp Tasks</h1>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList initialTasks={tasks} listStatuses={list.statuses ?? []} />
      </Suspense>
    </div>
  );
}
