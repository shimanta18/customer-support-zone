
const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a> HOME </a></li>
        <li><a> FAQ </a></li>
        <li><a> Changelog </a></li>
        <li><a> Blog </a></li>
        <li><a> Changelog </a></li>
        <li><a> Download </a></li>
        <li><a> Contact </a></li>
     
      </ul>
    </div>
    <a className="text-2xl font-bold ml-9">CS — Ticket System</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     <li><a> HOME </a></li>
        <li><a> FAQ </a></li>
        <li><a> Changelog </a></li>
        <li><a> Blog </a></li>
        <li><a> Changelog </a></li>
        <li><a> Download </a></li>
        <li><a> Contact </a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn rounded px-3 py-2 text-white font-bold bg-gradient-to-r from-purple-700 to-indigo-600">+New Ticket</a>
  </div>
</div>
  )
}

export default NavBar
