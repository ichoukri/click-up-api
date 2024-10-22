"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskStatus } from "@/lib/clickup";

interface Task {
  id: string;
  name: string;
  status: {
    status: string;
    color: string;
  };
}

interface ListStatus {
  id: string;
  status: string;
  color: string;
  orderindex: number;
  type: string;
}

interface TaskListProps {
  initialTasks: Task[];
  listStatuses: ListStatus[];
}

export default function TaskList({
  initialTasks,
  listStatuses,
}: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, status: { ...task.status, status: newStatus } }
            : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-2">{task.name}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Status:{" "}
              <span style={{ color: task.status.color }}>
                {task.status.status}
              </span>
            </p>
          </CardContent>
          <CardFooter>
            <Select
              onValueChange={(value) => handleStatusChange(task.id, value)}
              defaultValue={task.status.status}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                {listStatuses.map((status) => (
                  <SelectItem key={status.id} value={status.status}>
                    <span style={{ color: status.color }}>{status.status}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
