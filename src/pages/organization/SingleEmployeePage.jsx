import React, { useEffect, useState } from 'react'
import noProfile from '../../assets/noprofile.jpg'
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import { useLocation } from 'react-router-dom';
import { getEmployeeById } from '../../api/OrganizationApi';

const SingleEmployeePage = () => {
  const location = useLocation();
  const [employeeData, setEmployeeData] = useState({
      employeeID: '',
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      phoneNumber: '',
      dob: '',
      salary: '',
  });

  useEffect(() => {
    const employeeID = location.state?.employeeID
    fetchEmployeeDetails(employeeID)
}, [location.state?.employeeID]);

const fetchEmployeeDetails = async (employeeID) => {
    try {
        const response = await getEmployeeById(employeeID);
        const formattedDob = new Date(response.data.dob).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        setEmployeeData({
            ...response.data,
            dob: formattedDob,
        })
    } catch (error) {
        console.log('employee fetch error:', error);
    }
};
  return (
    <div className='flex min-h-[100vh]'>
    <Sidebar />
    <div className='mx-auto p-8'>
        <div className='flex flex-col items-center mt-6 mx-2'>
          <label htmlFor="profile">
            <input id='profile' type="file" hidden disabled />
            {
              employeeData?.imageUrl
                ?
                <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={employeeData?.imageUrl} alt="avatar" />
                :
                <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={noProfile} alt="avatar" />
            }
          </label>
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="employeeID" className="block text-sm font-medium leading-6 text-gray-900">
                Employee ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="employeeID"
                  id="employeeID"
                  value={employeeData?.employeeID ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={employeeData?.firstName ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={employeeData?.lastName ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={employeeData?.email ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                DOB
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  value={employeeData?.dob ?? ''}

                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                Salary
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={employeeData?.salary ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                Position
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={employeeData?.position ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={employeeData?.phoneNumber ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={handleEdit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Delete
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default SingleEmployeePage;