import { useState } from 'react';
import { Header } from '../components/Header';
import { MyOrdersPage } from './users/MyOrdersPage';


function UserDashboard() {

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto">
                <MyOrdersPage />
                </main>
            </div>
        </div>
    );
}

export default UserDashboard;