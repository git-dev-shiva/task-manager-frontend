"use client";
import { Button, Card, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import NextUIModal from "../nextUI/modal";
import { Tasks } from "@/common/types/create-tasks";
import CreateTasks from "./createTasks";
import toast from "react-hot-toast";


export default function TaskManagerDashboard() {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [editingTasks, setEditingTasks] = useState<Tasks | null>(null);
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
        getTasks()
    }, [])

    const getTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8081/tasks", {
                headers: {
                    jwttoken: token, // Include the JWT token in the request headers
                },
            })
            setTasks(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleTasks = async (values: any) => {
        try {
            if (editingTasks) {
                const res = await axios.patch(`http://localhost:8081/tasks/${editingTasks._id}`, values)
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === res.data.event._id ? res.data.event : task
                    )
                );
                toast.success("Task Updated Successfully");

            }
            else {
                const res = await axios.post("http://localhost:8081/tasks", values, {
                    headers: {
                        jwttoken: token, // Send token in jwttoken header
                    },
                })
                setTasks((prevTasks) => [res.data, ...prevTasks]);
                toast.success("Task Created Successfully");
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    const handleTaskStatusChange = (id: string) => {
        setTasks(
            tasks.map((task: any) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleEdit = async (taskId: string) => {
        try {
            const res = await axios.get(`http://localhost:8081/tasks/${taskId}`)
            if (res.statusText !== "OK") return;
            setEditingTasks(res.data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching aspect for editing:", error);
        }
    };

    const handleTaskDelete = (id: string) => {
        // setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-2">
            <div className="flex justify-between px-4">
                <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
                <Button onClick={() => setOpen(true)}>
                    Add New
                </Button>
            </div>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <Card key={task._id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox checked={task.completed} onChange={() => handleTaskStatusChange(task._id)} />
                                <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {task.title}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="cursor-pointer" onClick={() => handleEdit(task._id)}>
                                    <Icon icon="lucide:edit" />
                                </div>
                                <div className="cursor-pointer">
                                    <Icon icon="mdi:trash" />
                                </div>
                            </div>
                        </div>
                        <p className={`text-sm mt-2 ${task.completed ? "text-muted-foreground" : ""}`}>{task.description}</p>
                    </Card>
                ))}
            </div>

            <NextUIModal
                open={open}
                title="Create Tasks"
                onClose={() => {
                    setOpen(false);
                    setEditingTasks(null);
                }}
                size="lg"
            >
                <CreateTasks
                    onSubmit={handleTasks}
                    taskToEdit={editingTasks}
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setEditingTasks(null);
                    }}
                />
            </NextUIModal>
        </div>
    )
}
