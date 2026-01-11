
const StatusCard = ({ title, count, gradientColors, vectorImage }) => {
  return (
    <div 
      className="relative w-80 h-44 rounded-xl p-6 shadow-2xl overflow-hidden text-white transition-transform duration-300 hover:scale-[1.02]"
      style={{
        background: gradientColors,
      }}
    >
  
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${vectorImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay' 
        }}
      />

 
      <div className='relative z-10 flex flex-col items-center justify-center h-full'>
        <h2 className='text-xl mb-1 font-medium tracking-wide'>{title}</h2>
        <p className='text-7xl font-bold'>{count}</p>
      </div>
    </div>
  );
};

export default StatusCard;