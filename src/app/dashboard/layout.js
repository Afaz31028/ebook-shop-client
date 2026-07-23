import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen w-full">
                <div>
                    <DashboardSidebar></DashboardSidebar>
                </div>
                <div className='flex-1 ml-100'>
                    <main >{children}</main>
                </div>
        </div>
    );
};

export default DashboardLayout;