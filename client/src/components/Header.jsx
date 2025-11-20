import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, Package, ChevronDown } from 'lucide-react';
import { authAPI, ridersAPI } from "../services/api";

export function Header({ riderStatus, setRiderStatus }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authAPI.getSession();
        if (res.loggedIn) {
          setUser(res.user);
        } else {
          console.log("User not logged in");
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const [firstname, ...lastnameParts] = (user?.name || "").split(" ");
  const lastname = lastnameParts.join(" ");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const data = await authAPI.logout()
      if (data) {
        console.log(data.message);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleStatusChange = (newStatus) => {
    setRiderStatus(newStatus);
    setStatusOpen(false);

    ridersAPI.updateStatus(user.id, newStatus)
  };

  const getStatusColor = () => {
    switch (riderStatus) {
      case "Online": return "bg-green-500";
      case "On Delivery": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          {user?.role === "admin" ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders, customers, riders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
                <Package className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl">DeliveryHub</h1>
            </div>
          )}
        </div> 

        <div className="flex items-center gap-4 ml-8">
          {user?.role === "rider" && (
            <div className="relative" ref={statusRef}>
              <button
                onClick={() => {
                  if (riderStatus !== "On Delivery") {
                    setStatusOpen(!statusOpen);
                  }
                }}
                disabled={riderStatus === "On Delivery"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                  ${riderStatus === "On Delivery" 
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                    : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <span className={`w-2 h-2 rounded-full ${getStatusColor()}`}></span>
                {riderStatus}
                <ChevronDown className="w-4 h-4" />
              </button>

              {statusOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-100 rounded-lg p-2 z-50">
                  <p className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => handleStatusChange("Online")}>Online</p>
                  <p className="px-2 py-1 hover:bg-gray-100 rounded" onClick={() => handleStatusChange("Offline")}>Offline</p>
                </div>
              )}
            </div>
          )}

          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center cursor-pointer gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm">{firstname}</p>
                <p className="text-xs text-gray-500">{user?.email || ""} </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg border border-gray-100 rounded-xl p-4 z-50 animate-fadeIn">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Profile Information
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Full Name:</strong> {user?.name} </p>
                  <p><strong>Email:</strong> {user?.email || "<not set>"} </p>

                  {user?.role === "user" && (
                    <>
                      <p><strong>Address:</strong> {user?.address || "<not set>"}</p>
                      <p><strong>Phone:</strong> {user?.phone_number || "<not set>"} </p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
