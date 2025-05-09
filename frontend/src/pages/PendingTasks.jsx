import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

const PendingTasks = () => {
    const { user } = useAuth();
    const { tasks, fetchTasks, submitTask } = useTask();
    const location = useLocation();
    const { darkMode } = useTheme();

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const pendingTasks = tasks.filter((task) => task.status !== "Completed");

    return (
        <div
            className={`p-8 ml-64 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
            <h1 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                Pending Tasks
            </h1>

            {pendingTasks.length === 0 ? (
                <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No pending tasks.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingTasks.map((task) => (
                        <div
                            key={task._id}
                            className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
                        >
                            <h2 className="text-xl font-semibold">{task.title}</h2>
                            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{task.description}</p>
                            <p className="text-sm">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                            <p className="text-sm">Status: {task.status}</p>
                            <p className="text-sm">Progress: {task.progress}</p>

                            {/* Show update progress button only if task not completed */}
                            {task.status !== "Completed" && (
                                <Link
                                    to={`/update-task/${task._id}`}
                                    state={{ from: location.pathname }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-700 mt-2 inline-block ml-2"
                                >
                                    Update Task Progress
                                </Link>
                            )}

                            {/* Show submit button only if progress > 0 and task not completed */}
                            {task.status !== "Completed" && task.progress > 0 && (
                                <button
                                    onClick={() => submitTask(task._id)}
                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition mt-2 inline-block ml-2"
                                >
                                    Submit Task
                                </button>
                            )}

                            {/* Message to be displayed if already submitted */}
                            {task.status === "Completed" && (
                                <p className="text-green-500 font-semibold mt-2">Task Submitted</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingTasks;
