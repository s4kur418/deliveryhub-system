import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import setDocumentTitle from "../../hooks/set-document-title";
import { OrderDetails } from '../../components/OrderDetails';
import { Button } from '../../components/ui/button';
import { authAPI, ordersAPI } from '../../services/api';

export function MyDeliveryPage({ setRiderStatus }) {
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingOrder, setViewingOrder] = useState(null);
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
    if (user?.id) loadDeliveries();
  }, [user]);

  const loadDeliveries = async () => {
    try {
      const data = await ordersAPI.getByRiderId(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = async (orderId, newStatus) => {
    try {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        let message = '';
        if (newStatus === 'picked_up') message = 'Picked up successfully!'
        else if (newStatus === 'in_transit') message = 'Order Out of Delivery'
        else if (newStatus === 'delivered') message = 'Delivered Successfully!';

        await ordersAPI.update(orderId, {
            status: newStatus,
            rider_id: user.id,
            delivery_date: new Date().toISOString()
        });

        if (order.status === 'picked_up' || order.status === 'in_transit') {
            setRiderStatus('On Delivery'); // update locally for toggle
        } else if (order.status === 'delivered') {
            setRiderStatus('Online');
        }

        alert(message)
        loadDeliveries();
        // setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    } catch (err) {
        console.error(err);
        alert("Failed to update order. Please try again.");
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === "active") {
      return order.status !== "delivered" && order.status !== "cancelled";
    } else {
      return order.status === "delivered" || order.status === "cancelled";
    }
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">My Deliveries</h2>
          <p className="text-gray-500">View and manage all your deliveries</p>
        </div>
      </div>

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
            {tab === 'active' ? 'Active Deliveries' : 'Completed Deliveries'}
          </button>
        ))}
      </div>

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
              <p className="text-gray-400 text-lg">No delivery yet.</p>
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
                    <Truck />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Delivery #: <span className="text-gray-800">{order.id}</span>
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800">{order.items || "Untitled Order"}</h3>
                    <p className="text-gray-500 text-sm">
                      {order.status === "assigned" ? (
                        <>
                            Pick up Address: <span className="font-medium text-gray-700">{order.pickup_address || "N/A"}</span>
                        </>
                      ) : (
                        <>
                            Delivery Address: <span className="font-medium text-gray-700">{order.delivery_address || "N/A"}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">        
                      
                    {order.status === "assigned" && (
                        <Button
                            className="text-sm text-yellow-500 px-4 py-1.5 rounded-lg cursor-pointer hover:bg-yellow-50 hover:scale-105 hover:shadow"
                            onClick={() => handleChanges(order.id, "picked_up")}
                        >
                        Pick Up
                        </Button>
                    )}

                    {order.status === "picked_up" && (
                        <Button
                            className="text-sm text-blue-500 px-4 py-1.5 rounded-lg cursor-pointer hover:bg-blue-50 hover:scale-105 hover:shadow"
                            onClick={() => handleChanges(order.id, "in_transit")}
                        >
                            Start Delivery
                        </Button>
                    )}

                    {order.status === "in_transit" && (
                        <Button
                            className="text-sm text-green-500 px-4 py-1.5 rounded-lg cursor-pointer hover:bg-ygreen-50 hover:scale-105 hover:shadow"
                            onClick={() => handleChanges(order.id, "delivered")}
                        >
                        Complete Delivery
                        </Button>
                    )}

                    {order.status === "delivered" && (
                        <Button
                            className="text-green-600 px-4 py-1.5 rounded-lg cursor-not-allowed"
                        >
                            Delivered
                        </Button>
                    )}
                    {order.status !== "delivered" && (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="text-sm text-indigo-600 border-indigo-200 font-medium rounded-lg px-4 py-1.5
                                transition-all duration-200 cursor-pointer hover:bg-indigo-50 hover:scale-105 hover:shadow"
                                onClick={() => setViewingOrder(order)}
                            >
                            Track Order
                            </Button>                
                        </div>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {viewingOrder && (
        <OrderDetails
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
          onEdit={() => { setEditingOrder(viewingOrder); setViewingOrder(null); setShowForm(true); }}
        />
      )}
    </div>
  );
}


