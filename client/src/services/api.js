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
};

export const ordersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, { credentials: "include" });
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

// Customers API
export const customersAPI = {
  getAll: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCustomers]), 300);
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customer = mockCustomers.find(c => c.id === id);
        if (customer) resolve(customer);
        else reject(new Error('Customer not found'));
      }, 300);
    });
  },

 

  delete: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCustomers.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Customer not found'));
        }
      }, 300);
    });
  },
};

// Drivers API
export const ridersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/riders`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch riders");
    return response.json();
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const driver = mockDrivers.find(d => d.id === id);
        if (driver) resolve(driver);
        else reject(new Error('Driver not found'));
      }, 300);
    });
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

// Dashboard Stats API
export const dashboardAPI = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load dashboard stats");
    return response.json();
  },
};