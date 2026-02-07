
import React, { useState, useEffect } from 'react';
import { AppTab, Order, PricingItem } from './types';
import OrderModule from './components/OrderModule';
import PricingModule from './components/PricingModule';
import BOMModule from './components/BOMModule';
import OrderDetailsView from './components/OrderDetailsView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('manufacturing_orders');
    const savedPricing = localStorage.getItem('manufacturing_pricing');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedPricing) setPricing(JSON.parse(savedPricing));
  }, []);

  useEffect(() => {
    localStorage.setItem('manufacturing_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('manufacturing_pricing', JSON.stringify(pricing));
  }, [pricing]);

  const navigateToViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveTab(AppTab.VIEW_ORDER);
  };

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fe]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-sm">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-50">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">ProM</span>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <button 
            onClick={() => setActiveTab(AppTab.ORDERS)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === AppTab.ORDERS || activeTab === AppTab.VIEW_ORDER ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <span>Orders List</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(AppTab.PRICING)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === AppTab.PRICING ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Pricing</span>
          </button>

          <button 
            onClick={() => setActiveTab(AppTab.BOM)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold ${activeTab === AppTab.BOM ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span>BOM Report</span>
          </button>
        </nav>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-800 font-bold capitalize">{activeTab === AppTab.VIEW_ORDER ? 'Order Details' : activeTab}</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#f4f7fe] rounded-full px-10 py-2.5 text-sm w-64 outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:bg-white"
              />
              <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Admin User</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Manufacturing Manager</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === AppTab.ORDERS && (
              <OrderModule orders={orders} setOrders={setOrders} onViewOrder={navigateToViewOrder} />
            )}
            
            {activeTab === AppTab.VIEW_ORDER && (
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
                  <div className="h-fit">
                    <OrderModule orders={orders} setOrders={setOrders} onViewOrder={navigateToViewOrder} compact selectedId={selectedOrderId || ''} />
                  </div>
                  <div>
                    {selectedOrder ? (
                      <OrderDetailsView order={selectedOrder} onBack={() => setActiveTab(AppTab.ORDERS)} />
                    ) : (
                      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 flex flex-col items-center justify-center">
                        <p className="text-slate-400">Select an order to view material details.</p>
                      </div>
                    )}
                  </div>
               </div>
            )}

            {activeTab === AppTab.PRICING && (
              <PricingModule pricing={pricing} setPricing={setPricing} />
            )}
            
            {activeTab === AppTab.BOM && (
              <BOMModule orders={orders} pricing={pricing} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
