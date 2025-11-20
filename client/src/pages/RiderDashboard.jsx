import { useState } from 'react';
import { Header } from '../components/Header';
import { MyDeliveryPage } from '../pages/riders/MyDeliveryPage'

function RiderDashboard() {
    const [riderStatus, setRiderStatus] = useState("Offline");

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex-1 flex flex-col">
                <Header riderStatus={riderStatus} setRiderStatus={setRiderStatus}/>
                <main className="flex-1 overflow-y-auto">
                <MyDeliveryPage setRiderStatus={setRiderStatus}/>
                </main>
            </div>
        </div>
    );
}

export default RiderDashboard;