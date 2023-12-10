import React from 'react'
import { useSelector } from 'react-redux';
import noProfile from '../../assets/noprofile.jpg'
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

const OrganizationProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

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
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user?.name ?? ''}
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
                  value={user?.email ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={user?.phoneNumber ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={user?.location ?? ''}
                  required
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => navigate('/organization/edit-profile')}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrganizationProfile;