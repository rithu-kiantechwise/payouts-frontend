import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editEmpProfile } from '../../api/EmployeeApi';
import noProfile from '../../assets/noprofile.jpg'
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import { loginUser } from '../../redux/userSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const EmpProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const [employeeData, setEmployeeData] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        phoneNumber: '',
        salary: '',
        dob: '',
        imageUrl: '',
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
        if (user) {
            const formattedDob = new Date(user?.dob).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            setEmployeeData({
                employeeID: user?.employeeID,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                position: user?.position,
                phoneNumber: user?.phoneNumber,
                salary: user?.salary,
                dob: formattedDob,
                imageUrl: user?.imageUrl,
                bankAccount: {
                    accountHolderName: user?.bankAccount?.accountHolderName || '',
                    accountNumber: user?.bankAccount?.accountNumber || '',
                    bankName: user?.bankAccount?.bankName || '',
                    branch: user?.bankAccount?.branch || '',
                    IFSCcode: user?.bankAccount?.IFSCcode || '',
                    upiId: user?.bankAccount?.upiId || '',
                },
            });
        }
    }, [user])

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            if (name.includes('.')) {
                const [parentProp, childProp] = name.split('.');
                setEmployeeData((prevEmployeeData) => ({
                    ...prevEmployeeData,
                    [parentProp]: {
                        ...prevEmployeeData[parentProp],
                        [childProp]: value,
                    },
                }));
            } else {
                setEmployeeData((prevEmployeeData) => ({
                    ...prevEmployeeData,
                    [name]: value,
                }));
            }
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };
    const handleImageChange = async (e) => {
        try {
            const imageFile = e.target.files[0];
            if (imageFile.size > 1024 * 1024) {
                toast.error('Image size must be less than 1MB');
                return;
            }

            setEmployeeData({
                ...employeeData,
                imageUrl: URL.createObjectURL(imageFile),
                selectedImageFile: imageFile,
            });
        } catch (error) {
            console.error('Error in handleImageChange:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('employeeID', employeeData.employeeID);
            formData.append('firstName', employeeData.firstName);
            formData.append('lastName', employeeData.lastName);
            formData.append('email', employeeData.email);
            formData.append('dob', employeeData.dob);
            formData.append('salary', employeeData.salary);
            formData.append('position', employeeData.position);
            formData.append('phoneNumber', employeeData.phoneNumber);
            formData.append('image', employeeData.selectedImageFile);
            formData.append('accountHolderName', employeeData.bankAccount.accountHolderName);
            formData.append('accountNumber', employeeData.bankAccount.accountNumber);
            formData.append('bankName', employeeData.bankAccount.bankName);
            formData.append('branch', employeeData.bankAccount.branch);
            formData.append('IFSCcode', employeeData.bankAccount.IFSCcode);
            formData.append('upiId', employeeData.bankAccount.upiId);

            setLoading(true)
            const response = await editEmpProfile(formData)
            setLoading(false)

            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(loginUser(response.data.employeeDetail));
                navigate('/employee/employee-profile');
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error('Edit failed:');
        }
    };
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto p-8'>
                {!loading
                    ?
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col items-center mt-6 mx-2'>
                            <label htmlFor="profile">
                                <input onChange={handleImageChange} id='profile' type="file" hidden accept="image/*" />
                                {
                                    employeeData.imageUrl
                                        ?
                                        <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={employeeData.imageUrl} alt="avatar" />
                                        :
                                        <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={noProfile} alt="avatar" />
                                }
                            </label>
                        </div>
                        <div className="border-b border-gray-900/10 pb-10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit your profile</h2>

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
                                            required
                                            value={employeeData.employeeID}
                                            onChange={handleChange}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            value={employeeData.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            value={employeeData.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            autoComplete='email'
                                            required
                                            disabled
                                            value={employeeData.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            value={employeeData.dob}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            disabled
                                            value={employeeData.salary}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            value={employeeData.position}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            required
                                            value={employeeData.phoneNumber}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => navigate('/employee/employee-profile')}
                                className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Save
                            </button>
                        </div>
                    </form>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default EmpProfileEdit;