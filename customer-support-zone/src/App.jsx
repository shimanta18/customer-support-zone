import { useMemo, useState } from 'react';
import './App.css';


import vector1 from './assets/vector1.png';
import vector2 from './assets/vector2.png';
const Tickets = [
  {id:1001, title:'Login Issues - Can\'t Access Account', description:'Customer is unable to log in to their account. ',customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1002, title:    'Payment Failed - Card Declined',   description: 'Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.',       customer:'Sarah Johnson', priority:'HIGH PRIORITY', status:'Open',createdAt:'1/16/2024'},
  {id:1003, title:'Unable to Download Invoice', description:'Customer cannot download their January invoice from the billing section. The download button is...',customer:'john smith',    priority:'MEDIUM PRIORITY', status:'Open',createdAt: '1/17/2024'},
  {id:1004, title:'Incorrect Billing Address', description:'Customer’s billing address shows a different city. They updated it but it still displays the old one.',customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1005, title:'App Crash on Launch', description:'Customer reports that the mobile app crashes immediately upon opening on Android 13.',customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1006, title:'Refund Not Processed', description:'Customer requested a refund two weeks ago but has not received the amount yet.',customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1007, title:'Two-Factor Authentication Issue', description:'Customer is not receiving 2FA codes on their registered phone number.',customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1008, title:'Unable to Update Profile Picture', description:"Customer tries to upload a new profile picture but gets 'Upload failed' error.",customer:'john smith',    priority:'HIGH PRIORITY', status:'Open',createdAt:'1/15/2024'},
  {id:1009, title:'Subscription Auto-Renewal', description:' Customer wants to enable auto-renewal for their subscription but the toggle is disabled..',customer:'Liam Thomas',    priority:'MEDIUM PRIORITY', status:'In-Progress',createdAt:'1/17/2024'},
  {id:1010, title:'Missing Order Confirmation Email', description:"Customer placed an order but didn't receive a confirmation email even though payment succeeded.",customer:'Isabella Garcia', priority:'MEDIUM PRIORITY',status:'Open',createdAt:'1/24/2024'}
]


const StatusCard=({title, count, gradientColors, vectorImage})=> {
  return(
    <div className={`relative w-full max-w-sm md:max-w-md lg:max-w-xl h-64 rounded-xl p-8 shadow-2xl overflow-hidden text-white transition-transform duration-300 hover:scale-[1.02]`}
      style={{

        background:gradientColors,
        backgroundImage:`url(${vectorImage}),${gradientColors}`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundBlendMode:'luminosity,normal',
      }}
>



<div className='flex flex-col items-center justify-center h-full'>
  <h2 className='text-3xl mb-2 font-light'>{title}</h2>
  <p className='text-8xl'>{count}</p>
</div>
</div>
  );
};

const TicketCard=({ticket,onSelectTask}) =>{
  const getPriorityStyle =(priority)=>{
    switch(priority){
      case 'HIGH PRIORITY': return "bg-red-100 text-red-600";
      case 'MEDIUM PRIORITY': return 'bg-orange-100 text-orange-600';
      case 'LOW PRIORITY': return 'bg-blue-100 text-blue-600';
      default:return 'bg-gray-100 text-gray-600'
    }
  };

  
const isInProgress = ticket.status === 'In-Progress'

return(
  <div
  className={`p-6 mb-8 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg ${isInProgress ? ' pointer-events-none' : ' cursor-pointer'}`}
  onClick={()=> !isInProgress && onSelectTask(ticket)}
  >

    <div className='flex justify-between items-start'
    >
      <h3 className='font-semibold text-gray-900'>{ticket.title}</h3>
      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${isInProgress ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-green-100 text-green-700 border-green-300'}`}>
        {isInProgress ? 'In-Progress':'Open'}
      </span>
    </div>
<p className='text-gray-600 text-sm mt-1 mb-3 pr-8'>{ticket.description}</p>
<div className='flex items-center text-xs text-gray-500 gap-4'>
  <span className='text-gray-700 font-medium'>#{ticket.id}</span>
  <span className={`px-2 py-0.5 rounded-md font-bold ${getPriorityStyle(ticket.priority)}`}>{ticket.priority}</span>

  <span className="flex items-center gap-1">
    <div className='w-4 h-4 rounded-full bg-gray-300'></div>
    {ticket.customer}
  </span>

  <span >
    {ticket.createdAt}

  </span>
</div>
  </div>
)
}

const TaskStatusItem = ({task,onCompleteTask})=>{
  return(
    <div className='mb-4 p-3 border border-grey-200 rounded-lg bg-gray-50 flex justify-between items-center shadow-sm'>
      <span className='text-gray-700 font-medium text-sm' >{task.title}</span>
      <button
      className='px-3 py-1 text-xs font-bold text-white bg-green-500 rounded hover:bg-green-600 transition-colors'
      onClick={()=> onCompleteTask(task.id)}>Complete

      </button>
    </div>
  )
}

function App() {

  const [tickets, setTickets]=useState(Tickets);
  const [tasks,setTasks]= useState([])

  const inProgressCount = useMemo(()=>tasks.length,[tasks]);
  const resolvedCount = useMemo(()=>tickets.filter(t=>t.status === 'Resolved').length,[tickets]);

  const openTickets = useMemo(()=> tickets.filter(t => t.status === 'Open'),[tickets] );
  const col1Tickets = openTickets.filter((_,i)=>i % 2 ===0)
  const col2Tickets = openTickets.filter((_,i)=>i % 2 !==0)

  const handleSelectTask=(ticket)=>{
    setTasks(prevTasks =>[...prevTasks,ticket]);
    setTickets(prevTickets=>prevTickets.map(t=>t.id=== ticket.id?{...t,status:'In-Progress'}:t))
    alert(`Ticket #${ticket.id} "${ticket.title}"added to Task Status and marked In-Progress!`);
  };

  const handleCompleteTask =(taskID)=>{
    setTasks(prevTasks => prevTasks.filter(task=> task.id !== taskID));
    setTickets(prevTickets=>prevTickets.map(t=>t.id=== taskID?{...t,status:'Resolved'}:t))
    alert(`Ticket #${taskId} marked as Complete and Resolved!`);
  }
  return (
    <>
      <div className='navbar bg-white shadow-md px-10'>
        <div className='navbar-start'>
          <a className='font-bold text-3xl text-black'>CS — Ticket System</a>
        </div>
        <div className='navbar-center hidden lg:flex items-center gap-7 text-gray-600 text-sm'>
          <a href='#'>HOME</a>
          <a href='#'>FAQ</a>
          <a href='#'>Changelog</a>
          <a href='#'>Blog</a>
          <a href='#'>Download</a>
          <a href='#'>Contact</a>
        </div>
        <div className='navbar-end'>
          <a className='btn rounded px-6 py-2 text-white font-bold bg-gradient-to-r from-purple-700 to-indigo-600 '>+New Ticket</a>
        </div>
      </div>

{/* --- banner --- */}


<div className='w-full bg-neutral-200 px-10 pb-10 flex flex-col items-center '>
  <div className='flex flex-wrap justify-center gap-8 w-full max-w-7xl pt-8 pb-10'>

    <StatusCard
    title="In-Progress"
    count={inProgressCount}
    
    gradientColors="linear-gradient(135deg, #7E43CC 0%, #4B278D 100%)"
    vectorImage={vector1}
    />

    <StatusCard
    title={"Resolved"}
    count={resolvedCount}
    gradientColors="linear-gradient(135deg, #48BB78  0%, #2F855A 100%)"
    vectorImage={vector2}
    />

  </div>
</div>

<div className='w-full bg-neutral-200'>
<div className='w-full max-w-7xl flex flex-col lg:flex-row gap-10 mt-5'>
<div className='flex-grow bg-white p-6 rounded-lg shadow-md border border-gray-400'>
  <h2 className='text-2xl font-bold text-gray-800 mb-6'>Customer Tickets</h2>
<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
<div>
      {col1Tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} onSelectTask={handleSelectTask} />
))}
                    </div>
                    <div>
                        {col2Tickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} onSelectTask={handleSelectTask} />
                        ))}
  </div>
  </div>
  </div>

  <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
    <h2 className='text-2xl font-bold text-gray-800 mb-2'>Task Status</h2>
    <p className='text-sm text-gray-500 font-bold mb-6'>Select a ticket to add to Task Status</p>

    <div className='mt-4 border-t pt-4'>
      <h3 className='mb-3 font-Semibold text-2xl text-gray-700'>Resloved Task</h3>

      {tasks.length === 0 ?(
        <p className="text-gray-500 text-sm italic">No active tasks. Select a ticket to begin.</p>
      ):(
        tasks.map(task=>(
          <TaskStatusItem
          key={task.id}
          task={task}
          onCompleteTask={handleCompleteTask}
          />
        ))
      )}
  </div>
  
</div>
</div>
</div>

    </>
  )
}



export default App
