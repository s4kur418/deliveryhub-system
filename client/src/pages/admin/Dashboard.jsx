import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, Truck, PhilippinePeso, Calendar } from 'lucide-react';
import setDocumentTitle from "../../hooks/set-document-title";
import { dashboardAPI } from '../../services/api';

export function Dashboard({ setActiveTab }) {
  setDocumentTitle("Dashboard | Delivery Hub");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
      borderColor: 'border-yellow-200',
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200',
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers,
      icon: Truck,
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Total Revenue',
      value: `₱${stats.totalRevenue.toFixed(2)}`,
      icon: PhilippinePeso,
      color: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: Calendar,
      color: 'bg-indigo-50 text-indigo-600',
      borderColor: 'border-indigo-200',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg border ${stat.borderColor} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('orders')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Package className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium">Create New Order</p>
            <p className="text-sm text-gray-600">Add a new delivery order</p>
          </button>
          <button 
            onClick={() => setActiveTab('drivers')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Truck className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium">Manage Drivers</p>
            <p className="text-sm text-gray-600">View and assign drivers</p>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium">View Reports</p>
            <p className="text-sm text-gray-600">Check performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
}
