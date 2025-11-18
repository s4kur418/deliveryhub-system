import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Truck, 
  Settings,
  Package
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, user }) {
  const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'drivers', label: 'Riders', icon: Truck },
  ]
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl">DeliveryHub</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
