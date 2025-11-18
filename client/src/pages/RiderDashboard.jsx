import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { MyOrdersPage } from './users/MyOrdersPage';

function RiderDashboard() {
    const [activeTab, setActiveTab] = useState('');

    const renderContent = () => {
        switch (activeTab) {
        case 'myorders':
            return <MyOrdersPage />;
        default:
            return <MyOrdersPage />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <main className="flex-1 overflow-y-auto">
                {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default RiderDashboard;