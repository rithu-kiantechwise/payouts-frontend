import React from 'react'
import noProfile from '../../assets/noprofile.jpg'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const formattedDate = user ? new Date(user?.dob).toISOString().split('T')[0] : '';

  return (
    <div className='flex min-h-[100vh]'>
      <Sidebar />
      <div className='mx-auto p-8'>
        <div className='flex flex-col items-center mt-6 mx-2'>
          <label htmlFor="profile">
            <input id='profile' type="file" hidden disabled />
            {
              user?.imageUrl
                ?
                <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={user?.imageUrl} alt="avatar" />
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
                  value={user?.employeeID ?? ''}
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
                  value={user?.firstName ?? ''}
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
                  value={user?.lastName ?? ''}
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
                  value={user?.email ?? ''}
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
                  type="date"
                  name="dob"
                  id="dob"
                  value={formattedDate ?? ''}
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
                  type="number"
                  id="salary"
                  name="salary"
                  value={user?.salary ?? ''}
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
                  value={user?.position ?? ''}
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
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={user?.phoneNumber ?? ''}
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <h2 className="text-base font-semibold text-gray-900">Bank Account Details</h2>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="accountHolderName" className="block text-sm font-medium leading-6 text-gray-900">
                Account Holder Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="bankAccount.accountHolderName"
                  id="accountHolderName"
                  disabled
                  value={user?.bankAccount?.accountHolderName ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="accountNumber" className="block text-sm font-medium leading-6 text-gray-900">
                Account Number
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="accountNumber"
                  name="bankAccount.accountNumber"
                  disabled
                  value={user?.bankAccount?.accountNumber ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="bankName" className="block text-sm font-medium leading-6 text-gray-900">
                Bank Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="bankName"
                  name="bankAccount.bankName"
                  disabled
                  value={user?.bankAccount?.bankName ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                Branch
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="branch"
                  name="bankAccount.branch"
                  disabled
                  value={user?.bankAccount?.branch ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="IFSCcode" className="block text-sm font-medium leading-6 text-gray-900">
                IFSC code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="IFSCcode"
                  name="bankAccount.IFSCcode"
                  disabled
                  value={user?.bankAccount?.IFSCcode ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="upiId" className="block text-sm font-medium leading-6 text-gray-900">
                Upi Id
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="upiId"
                  name="bankAccount.upiId"
                  disabled
                  value={user?.bankAccount?.upiId ?? ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate('/employee/edit-profile')}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile;