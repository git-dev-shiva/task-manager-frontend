import dynamic from "next/dynamic";

const TaskManagerDashboard = dynamic(() => import("@/components/taskManagerDashboard"), {
    ssr: false,
});

const TaskManagerDashboardPage = () => {
    return <TaskManagerDashboard />;
};

export default TaskManagerDashboardPage;
