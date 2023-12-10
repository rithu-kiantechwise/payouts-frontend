import React, { useState } from 'react'
import PayoutsLogo from '../../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 bg-gradient-to-b from-violet-100 sticky top-0 shadow-md py-1 md:py-2">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
        <button onClick={() => navigate('/')} className="flex items-center">
          <img src={PayoutsLogo} className="h-10 mr-3" alt="PayoutsLogo" />
        </button>
        <button onClick={() => setToggle(!toggle)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
        </button>
        {toggle && <div className="md:hidden w-full md:w-auto">
          <ul className="font-medium flex flex-col gap-2 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button onClick={() => navigate('/features')} className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:text-violet-500">Features</button>
            </li>
            <li>
              <button onClick={() => navigate('/pricing')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</button>
            </li>
            <li>
              <button onClick={() => navigate('/integrations')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Integration</button>
            </li>
            <li>
              <button onClick={() => navigate('/help')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Help</button>
            </li>
          </ul>
        </div>}

        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col gap-2 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <button onClick={() => navigate('/features')} className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:text-violet-500">Features</button>
            </li>
            <li>
              <button onClick={() => navigate('/pricing')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</button>
            </li>
            <li>
              <button onClick={() => navigate('/integrations')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Integration</button>
            </li>
            <li>
              <button onClick={() => navigate('/help')} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Help</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;