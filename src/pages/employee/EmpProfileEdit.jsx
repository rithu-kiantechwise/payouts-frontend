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
            });
        }
    }, [user])

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setEmployeeData(prevEmployeeData => ({
                ...prevEmployeeData,
                [name]: value,
            }));
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
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            required
                                            value={employeeData.phoneNumber}
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