"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-white">
                        Task Manager
                    </h1>
                    <p className="text-xl text-white mt-4">
                        Organize Your Tasks Effortlessly
                    </p>
                    <Button
                        onClick={handleGetStarted}
                        className="mt-8 bg-white text-indigo-600 hover:bg-indigo-700 hover:text-white transition duration-300"
                    >
                        Get Started
                    </Button>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            {/* <img src="/images/task.png" alt="Create Tasks" className="mx-auto mb-4" /> */}
                            <h3 className="text-xl font-medium">Create Tasks</h3>
                            <p className="mt-2 text-gray-600">
                                Easily add and manage tasks.
                            </p>
                        </div>
                        <div>
                            {/* <img src="/icons/edit.svg" alt="Edit Tasks" className="mx-auto mb-4" /> */}
                            <h3 className="text-xl font-medium">Edit Tasks</h3>
                            <p className="mt-2 text-gray-600">
                                Edit tasks to update their details.
                            </p>
                        </div>
                        <div>
                            {/* <img src="/icons/check.svg" alt="Complete Tasks" className="mx-auto mb-4" /> */}
                            <h3 className="text-xl font-medium">Complete Tasks</h3>
                            <p className="mt-2 text-gray-600">
                                Mark tasks as complete with a click.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-700 mb-8">
                        Sign up or log in to start managing your tasks today.
                    </p>
                    <Button
                        onClick={handleGetStarted}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
                    >
                        Get Started
                    </Button>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-8 bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p>&copy; 2024 Task Manager. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="/contact" className="text-gray-400 hover:text-white mr-4">Contact</a>
                        <a href="/terms" className="text-gray-400 hover:text-white mr-4">Terms of Service</a>
                        <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
