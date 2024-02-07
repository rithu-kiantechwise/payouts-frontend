import React, { useEffect, useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Attendance from '../../components/employee/empDashboard/Attendance';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import AttendanceDetails from '../../components/employee/empDashboard/AttendanceDetails';
import { deleteNotification, getNotification, unreadNotification } from '../../api/EmployeeApi';

const EmployeeDashboard = () => {
  const [isEmployeeCheckedIn, setIsEmployeeCheckedIn] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await getNotification();
      setNotifications(response.data?.notifications || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  const handleOpen = async () => {
    try {
      const response = await unreadNotification();
      setNotifications(response.data?.notifications || []);
      setOpenNotification(!openNotification);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }
  const clearNotification = async () => {
    try {
      await deleteNotification();
      setNotifications([]);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCheckInChange = (isCheckedIn) => {
    setIsEmployeeCheckedIn(isCheckedIn);
  };

  const handleCheckOutChange = (isCheckedOut) => {
    setIsEmployeeCheckedIn(!isCheckedOut);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='flex min-h-[100vh]'>
      <Sidebar />
      <div className="min-w-[80%] mx-auto p-6">
        <div className='flex justify-end'>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900">
              <FontAwesomeIcon icon={faBell} onClick={handleOpen} className='cursor-pointer text-gray-800 text-2xl' />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {notifications.length === 0 ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block min-w-full px-4 py-2 text-sm'
                          )}
                        >
                          No notifications
                        </button>
                      )}
                    </Menu.Item>
                  ) : (
                    notifications.map((notification) => (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <strong>{notification.title}</strong>
                            <p>{notification.content}</p>
                          </button>
                        )}
                      </Menu.Item>
                    ))
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={clearNotification}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block min-w-full px-4 py-2 text-sm'
                        )}
                      >
                        Clear all
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <Attendance
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
        />
        <AttendanceDetails isEmployeeCheckedIn={isEmployeeCheckedIn} />
      </div>
    </div>
  )
}

export default EmployeeDashboard;