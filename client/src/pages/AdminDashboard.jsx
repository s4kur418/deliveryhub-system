import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Dashboard } from './admin/Dashboard';
import { OrdersPage } from './admin/OrdersPage';
import { RidersPage } from './admin/RidersPage';


function AdminDashboard({ user }) {
    const [activeTab, setActiveTab] = useState('');

    const renderContent = () => {
        switch (activeTab) {
        case 'dashboard':
            return <Dashboard setActiveTab={setActiveTab}/>;
        case 'orders':
            return <OrdersPage />;
        case 'drivers':
            return <RidersPage />;
        default:
            return <Dashboard setActiveTab={setActiveTab}/>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user}/>
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <main className="flex-1 overflow-y-auto">
                {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;