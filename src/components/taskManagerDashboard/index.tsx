"use client";
import React, { Button, Card, Checkbox, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import NextUIModal from "../nextUI/modal";
import { Tasks } from "@/common/types/create-tasks";
import CreateTasks from "./createTasks";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function TaskManagerDashboard() {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [editingTasks, setEditingTasks] = useState<Tasks | null>(null);
    const [open, setOpen] = useState(false);
    // const [token, setToken] = useState<string | null>(null);
    const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null); // State for managing the task to be deleted
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        // Ensure this only runs on the client side
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            } else {
                router.push("/login");
            }
        }
    }, [router]);

    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        if (!token) {
            router.push("/login"); // Redirect to login if token is missing
        } else {
            getTasks();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token from localStorage
        toast.success("Logged out successfully");
        router.push("/login"); // Redirect to login page
    };

    const getTasks = async () => {
        try {
            const res = await axios.get("https://task-manager-backend-3r74.onrender.com/tasks", {
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
                const res = await axios.patch(`https://task-manager-backend-3r74.onrender.com/tasks/${editingTasks._id}`, values)
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === res.data.event._id ? res.data.event : task
                    )
                );
                toast.success("Task Updated Successfully");

            }
            else {
                const res = await axios.post("https://task-manager-backend-3r74.onrender.com/tasks", values, {
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


    const handleTaskStatusChange = async (id: string, currentStatus: boolean) => {
        try {
            const res = await axios.patch(
                `https://task-manager-backend-3r74.onrender.com/tasks/${id}`,
                { completed: !currentStatus },
                {
                    headers: {
                        jwttoken: token,
                    },
                }
            );

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? { ...task, completed: !currentStatus } : task
                )
            );

            toast.success("Task status updated successfully");
        } catch (error) {
            console.error("Error updating task status:", error);
            toast.error("Failed to update task status");
        }
    };

    const handleEdit = async (taskId: string) => {
        try {
            const res = await axios.get(`https://task-manager-backend-3r74.onrender.com/tasks/${taskId}`)
            // if (res.statusText !== "OK") return;
            setEditingTasks(res.data);
            setOpen(true);
        } catch (error) {
            console.error("Error fetching aspect for editing:", error);
        }
    };

    const confirmDeleteTask = (id: string) => {
        setDeleteTaskId(id); // Store the task ID to be deleted
        setDeleteModalOpen(true); // Open the delete confirmation modal
    };

    const handleTaskDelete = async () => {
        if (!deleteTaskId) return;
        try {
            const res = await axios.delete(`https://task-manager-backend-3r74.onrender.com/tasks/${deleteTaskId}`)
            if (!res.data) return toast.error("Unable to delete")
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deleteTaskId));
            setDeleteModalOpen(false);
            toast.success("task deleted successfully")
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-2">
            <Toaster />
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-md shadow-lg mb-4">
                <h1 className="text-3xl font-extrabold text-white tracking-wide">Task Manager</h1>
                <div className="flex gap-4">
                    <Button
                        onClick={handleLogout}
                        color="danger"
                        variant="light"
                        className="hover:bg-red-600 hover:text-white transition duration-300"
                    >
                        Logout
                    </Button>
                    <Button
                        onClick={() => setOpen(true)}
                        color="primary"
                        className="bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white transition duration-300"
                    >
                        Add New
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <Card key={task._id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox isSelected={task.completed} onChange={() => handleTaskStatusChange(task._id, task.completed)} />
                                <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                                    {task.title}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="cursor-pointer" onClick={() => handleEdit(task._id)}>
                                    <Icon icon="lucide:edit" />
                                </div>
                                <div className="cursor-pointer" onClick={() => confirmDeleteTask(task._id)}>
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

            <NextUIModal
                open={deleteModalOpen}
                title="Warning"
                onClose={() => setDeleteModalOpen(false)}
            >
                <ModalHeader>
                    <p>
                        Are you sure you want to delete this task?
                    </p>
                </ModalHeader>
                <ModalBody>
                    <p>This action cannot be undone.</p>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                            setDeleteModalOpen(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button color="primary" onClick={handleTaskDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </NextUIModal>
        </div>
    )
}
