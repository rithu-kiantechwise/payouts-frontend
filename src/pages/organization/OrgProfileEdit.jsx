import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { editOrgProfile } from '../../api/OrganizationApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noProfile from '../../assets/noprofile.jpg'
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import { loginUser } from '../../redux/userSlice';

const OrgProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [organizationData, setOrganizationData] = useState({
        name: '',
        email: '',
        location: '',
        phoneNumber: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (user) {
            setOrganizationData({
                name: user?.name,
                email: user?.email,
                location: user?.location,
                phoneNumber: user?.phoneNumber,
                imageUrl: user?.imageUrl,
            });
        }
    }, [user])

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setOrganizationData(prevOrganizationData => ({
                ...prevOrganizationData,
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
            setOrganizationData({
                ...organizationData,
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
            formData.append('name', organizationData.name);
            formData.append('email', organizationData.email);
            formData.append('phoneNumber', organizationData.phoneNumber);
            formData.append('location', organizationData.location);
            formData.append('image', organizationData.selectedImageFile);

            const response = await editOrgProfile(formData)
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(loginUser(response.data.organizationDetail));
                navigate('/organization/organization-profile');
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
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center mt-6 mx-2'>
                        <label htmlFor="profile">
                            <input onChange={handleImageChange} id='profile' type="file" hidden accept="image/*"/>
                            {
                                organizationData.imageUrl
                                    ?
                                    <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={organizationData.imageUrl} alt="avatar" />
                                    :
                                    <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={noProfile} alt="avatar" />
                            }
                        </label>
                    </div>
                    <div className="border-b border-gray-900/10 pb-10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Edit your profile</h2>

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
                                        required
                                        value={organizationData.name}
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
                                        required
                                        value={organizationData.email}
                                        onChange={handleChange}
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
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        required
                                        value={organizationData.phoneNumber}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        required
                                        value={organizationData.location}
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
                            onClick={() => navigate('/organization/organization-profile')}
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
            </div>
        </div>
    )
}

export default OrgProfileEdit;