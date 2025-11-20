const API_BASE_URL = '/api';

export const authAPI = {
  getSession: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/session`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch session");

      return res.json();
    } catch (err) {
      return { loggedIn: false }; // fallback
    }
  },

  signup: async (data) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to sign up");
    return response.json();
  },

  login: async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();
      return { ok: response.ok, data };

    } catch (err) {
      return {
        ok: false,
        data: { message: "Server error. Please try again." },
      };
    }
  },

  logout: async (data) => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to log out");
    return response.json();
  },
};

export const ordersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
  },

  getByCustomerId: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch order");
    return response.json();
  },

  getByRiderId: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/rider/${id}`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch order");
    return response.json();
  },

  create: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to create order");
    return response.json();
  },

  update: async (id, orderData) => {    
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to update order");
    return response.json();
  },

  // DELETE order
  delete: async (id) => {    
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete order");
    return response.json();
  },

  assignRider: async (orderId, riderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/assign-rider`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ rider_id: riderId }),
    });

    if (!response.ok) throw new Error("Failed to assign rider");

    return response.json();
  },
};

export const ridersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/riders`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch riders");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/rider/${id}`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch order");
    return response.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE_URL}/riders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create rider");
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/riders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update rider");
    return res.json();
  },

  updateStatus: async (id, status) => {
    const res = await fetch(`${API_BASE_URL}/riders/${id}/updateStatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update rider");
    return res.json();
  },

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDrivers.findIndex(d => d.id === id);
        if (index !== -1) {
          mockDrivers.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Driver not found'));
        }
      }, 300);
    });
  },
};

export const dashboardAPI = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load dashboard stats");
    return response.json();
  },
};