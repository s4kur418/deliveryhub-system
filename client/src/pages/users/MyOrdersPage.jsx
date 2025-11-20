import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import setDocumentTitle from "../../hooks/set-document-title";
import { ordersAPI } from '../../services/api';
import { OrderForm } from '../../components/OrderForm';
import { OrderDetails } from '../../components/OrderDetails';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { authAPI } from '../../services/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export function MyOrdersPage() {
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState("active");

  if (activeTab === 'active') {
    setDocumentTitle("Active Orders | Delivery Hub");
  } else {
    setDocumentTitle("Past Orders | Delivery Hub");
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authAPI.getSession();
        if (data.loggedIn) {
          setUser(data.user);
          setLoading(false);
        } else {
          console.log("User not logged in");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setLoading(false)
      }
    };

    fetchUser();
  }, []);
  
  useEffect(() => {
    if (user?.id) loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await ordersAPI.getByCustomerId(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteOrderId) return;
    try {
      await ordersAPI.delete(deleteOrderId);
      setOrders(orders.filter(o => o.id !== deleteOrderId));
      setDeleteOrderId(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleFormSubmit = () => {
    loadOrders();
    setShowForm(false);
    setEditingOrder(null);
  };

  const getStatusGradient = (status) => {
    const gradients = {
      pending: 'bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900',
      assigned: 'bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900',
      picked_up: 'bg-gradient-to-r from-purple-200 to-purple-400 text-purple-900',
      in_transit: 'bg-gradient-to-r from-indigo-200 to-indigo-400 text-indigo-900',
      delivered: 'bg-gradient-to-r from-green-200 to-green-400 text-green-900',
      cancelled: 'bg-gradient-to-r from-red-200 to-red-400 text-red-900',
    };
    return gradients[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) =>
    status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const filteredOrders = orders.filter(order => {
    if (activeTab === "active") {
      return order.status !== "delivered" && order.status !== "cancelled";
    } else {
      return order.status === "delivered" || order.status === "cancelled";
    }
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">My Orders</h2>
          <p className="text-gray-500">View and manage all your delivery orders</p>
        </div>
        <Button
          onClick={() => { setEditingOrder(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-blue-500 text-white shadow-md hover:from-indigo-600 hover:to-blue-600 px-4 py-2"
        >
          <Plus className="w-5 h-5" />New Order  
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['active', 'past'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-indigo-500 hover:border-indigo-300'
            }`}
          >
            {tab === 'active' ? 'Active Orders' : 'Past Orders'}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
              <p className="text-gray-400 text-lg">No orders found.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center hover:shadow-md hover:border-indigo-100 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    } shadow-sm`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h18v4H3V3zm0 8h18v4H3v-4zm0 8h18v4H3v-4z"
                      />
                    </svg>
                  </div>

                  {/* Order Info */}
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Order ID: <span className="text-gray-800">{order.id}</span>
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800">{order.items || "Untitled Order"}</h3>
                    <p className="text-gray-500 text-sm">
                      Estimated Delivery: <span className="font-medium text-gray-700">{order.estimatedDelivery || "N/A"}</span>
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-end gap-3">
                  <Badge
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${getStatusGradient(order.status)}`}
                  >
                    {getStatusLabel(order.status)}
                  </Badge>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="text-sm text-indigo-600 border-indigo-200 font-medium rounded-lg px-4 py-1.5
                      transition-all duration-200 hover:bg-indigo-50 hover:scale-105 hover:shadow"
                      onClick={() => setViewingOrder(order)}
                    >
                      Track Order
                    </Button>
                    {order.status === 'pending'&& (
                      <button
                        onClick={() => setDeleteOrderId(order.id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}                     
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <OrderForm
          order={editingOrder}
          loggedInUser={user}
          onClose={() => { setShowForm(false); setEditingOrder(null); }}
          onSubmit={handleFormSubmit}
        />
      )}

      {viewingOrder && (
        <OrderDetails
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
          onEdit={() => { setEditingOrder(viewingOrder); setViewingOrder(null); setShowForm(true); }}
        />
      )}

      {/* Delete Alert */}
      <AlertDialog open={deleteOrderId !== null} onOpenChange={() => setDeleteOrderId(null)}>
        <AlertDialogContent className="max-w-md mx-auto rounded-xl bg-white shadow-lg border border-gray-200 p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-gray-800">
              Delete Order
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-1">
              Are you sure you want to delete this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-end gap-3">
            <AlertDialogCancel className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


