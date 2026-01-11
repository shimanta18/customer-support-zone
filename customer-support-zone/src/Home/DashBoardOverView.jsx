import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { initialTickets } from '../../public/ticketData';
import vector1 from '../assets/vector1.png';
import vector2 from '../assets/vector2.png';
import StatusCard from './StatusCard';

const DashBoardOverview = () => {
  const [tickets, setTickets] = useState(initialTickets);

  const handleTicketClick = (id) => {
    toast.success('In Progress!', {
      duration: 3000,
      position: 'top-right',
      style: {
        borderRadius: '0px', 
        background: '#fff',
        color: '#333',
        padding: '16px',
        borderBottom: '4px solid #4ade80', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      iconTheme: {
        primary: '#4ade80',
        secondary: '#fff',
      },
    });

    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'In-Progress' } : t
    ));
  };

  const handleResolve = (id) => {
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'Resolved' } : t
    ));
  };

  const inProgressCount = tickets.filter(t => t.status === 'In-Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster />
      
      {/* 1. TOP SECTION: Responsive Scaling */}
      {/* We use scale-110 on mobile and scale-150 on larger screens to prevent overflow */}
      <div className="flex justify-center items-center gap-4 md:gap-16 mb-16 md:mb-32 py-12 max-w-7xl mx-auto transform scale-110 md:scale-150">
        <StatusCard 
          title="In-Progress" 
          count={inProgressCount} 
          gradientColors="linear-gradient(135deg, #6366f1, #a855f7)" 
          vectorImage={vector1} 
        />
        <StatusCard 
          title="Resolved" 
          count={resolvedCount} 
          gradientColors="linear-gradient(135deg, #10b981, #0f766e)" 
          vectorImage={vector2} 
        />
      </div>

      {/* 2. BOTTOM SECTION: Side-by-Side on Desktop, Stacked on Mobile */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto items-start mt-10">
        
        {/* Left: Customer Tickets Grid */}
        <div className="w-full lg:flex-1 order-2 lg:order-1">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-900">Customer Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.filter(t => t.status === 'Open').map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => handleTicketClick(ticket.id)}
                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">{ticket.title}</h3>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-1 rounded-full border border-emerald-100 font-bold uppercase">Open</span>
                </div>
                <p className="text-slate-400 text-xs mb-4 line-clamp-2">{ticket.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-[10px] font-black uppercase">{ticket.priority}</span>
                  <span className="text-slate-400 text-[10px] italic">{ticket.customer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Task Status Sidebar */}
        {/* On mobile, this will appear ABOVE the tickets (order-1) so users see active tasks first */}
        <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-8 order-1 lg:order-2">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800">Task Status</h2>
            <p className="text-gray-400 text-[10px] mb-6">Select a ticket to add to Task Status</p>
            
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b border-gray-50 pb-2">Resolved Task</h3>
            
            <div className="space-y-4">
              {tickets.filter(t => t.status === 'In-Progress').map(t => (
                <div key={t.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] font-bold text-slate-700 pr-2 leading-tight">{t.title}</p>
                  <button 
                    onClick={() => handleResolve(t.id)}
                    className="bg-[#00c853] hover:bg-green-600 text-white text-[10px] font-bold py-2 px-3 rounded-lg transition-colors shrink-0 uppercase"
                  >
                    Complete
                  </button>
                </div>
              ))}
              {inProgressCount === 0 && (
                <p className="text-gray-400 text-xs italic py-2 text-center">No active tasks. Select a ticket to begin.</p>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DashBoardOverview;