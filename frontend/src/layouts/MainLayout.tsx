import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-950 font-inter transition-colors duration-300">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
