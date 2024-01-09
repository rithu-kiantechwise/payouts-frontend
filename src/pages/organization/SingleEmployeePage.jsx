import React, { useEffect, useState } from 'react'
import noProfile from '../../assets/noprofile.jpg'
import Sidebar from '../../components/organization/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteEmployee, getEmployeeById } from '../../api/OrganizationApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingSpinner from '../../components/LoadingSpinner';
const MySwal = withReactContent(Swal);

const SingleEmployeePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    phoneNumber: '',
    dob: '',
    salary: '',
    bankAccount: {
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      branch: '',
      IFSCcode: '',
      upiId: '',
    },
  });

  useEffect(() => {
    const employeeID = location.state?.employeeID
    fetchEmployeeDetails(employeeID)
  }, [location.state?.employeeID]);

  const fetchEmployeeDetails = async (employeeID) => {
    try {
      setLoading(true)
      const response = await getEmployeeById({ employeeID });
      setLoading(false)
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

  const handleDelete = async () => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            title: "Deleting...",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
          });
          setLoading(true)
          const response = await deleteEmployee(employeeData._id);
          setLoading(false)
          MySwal.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
          });
          navigate('/organization/employee-details');
        }
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = () => {
    try {
      navigate(`/organization/edit-employee`, { state: { employeeID: employeeData._id } });
    } catch (error) {
      console.error('Error navigating to edit employee page:', error);
    }
  };
  return (
    <div className='flex min-h-[100vh]'>
      <Sidebar />
      <div className='mx-auto p-8'>
        {!loading
          ?
          <div>
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
                      value={employeeData?.dob ?? ''}
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
                      value={employeeData?.salary ?? ''}
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
                      value={employeeData?.phoneNumber ?? ''}
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
                      value={employeeData.bankAccount.accountHolderName}
                      disabled
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
                      value={employeeData.bankAccount.accountNumber}
                      disabled
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
                      value={employeeData.bankAccount.bankName}
                      disabled
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
                      value={employeeData.bankAccount.branch}
                      disabled
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
                      value={employeeData.bankAccount.IFSCcode}
                      disabled
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
                      value={employeeData.bankAccount.upiId}
                      disabled
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleEdit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Edit user
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                Delete user
              </button>
            </div>
          </div>
          :
          <LoadingSpinner />
        }
      </div>
    </div>
  )
}

export default SingleEmployeePage;