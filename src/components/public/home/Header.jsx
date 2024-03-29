import React, { Fragment, useEffect, useState } from 'react'
import noProfile from '../../../assets/noprofile.jpg'
import { Disclosure, Menu, Transition, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../../../api/EmployeeApi'
import { fetchOrganizationData } from '../../../api/OrganizationApi'
import { loginUser } from '../../../redux/userSlice'
import { fetchAdminData } from '../../../api/AdminApi'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dashboardLink, setDashboardLink] = useState('/');
  const [profileLink, setProfileLink] = useState('/');
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response;

        if (localStorage.getItem('employeeToken')) {
          response = await fetchEmployeeData();
          setDashboardLink('/employee/dashboard');
          setProfileLink('/employee/employee-profile');
        } else if (localStorage.getItem('organizationToken')) {
          response = await fetchOrganizationData();
          setDashboardLink('/organization/dashboard');
          setProfileLink('/organization/organization-profile');
        } else if (localStorage.getItem('adminToken')) {
          response = await fetchAdminData();
          setDashboardLink('/admin/dashboard');
          setProfileLink('/admin/admin-profile');
        }

        if (response?.data) {
          dispatch(loginUser(response.data));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const logoutFunction = () => {
    localStorage.clear()
  }

  return (
    <Disclosure as="nav" className="border">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a
                      href='https://wa.me/7907019154'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-violet-800 hover:text-violet-800 rounded-md px-3 py-2 text-sm font-medium'                      >
                      Grab Your Offer Now!
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {
                          user?.imageUrl
                            ?
                            <img className="h-10 w-10 rounded-full" src={user?.imageUrl} alt="avatar" />
                            :
                            <img className="h-10 w-10 rounded-full" src={noProfile} alt="avatar" />
                        }
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(dashboardLink)}
                              className={classNames(active ? 'bg-gray-100' : '', 'block min-w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Dashboard
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(profileLink)}
                              className={classNames(active ? 'bg-gray-100' : '', 'block min-w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Profile Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutFunction}
                              className={classNames(active ? 'bg-gray-100' : '', 'block min-w-full text-left px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button onClick={() => navigate('/organization/login')} className='p-1 px-2 md:px-6 bg-violet-500 text-white font-medium uppercase'>Login</button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href='https://wa.me/7907019154'
                target='_blank'
                rel='noopener noreferrer'
                className='text-violet-800 border hover:text-violet-800 block rounded-md px-3 py-2 text-base font-medium'
              >
                Grab Your Offer Now!
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header;