import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { blockOrganization, getAllOrganizations, unblockOrganization } from '../../api/AdminApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';
const MySwal = withReactContent(Swal);

const OrganizationDetails = () => {
    const navigate = useNavigate();
    const [organizationData, setOrganizationData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const response = await getAllOrganizations({ page: currentPage });
                console.log(response.data.organizations, 'response');
                setOrganizationData(response.data?.organizations);
                setTotalPages(response.data?.totalPages);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        }
        fetchOrganization();
    }, [currentPage])


    const handleBlock = async (OrganizationId) => {
        try {
            MySwal.fire({
                title: "Are you sure?",
                text: "You want to block the organization!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Block!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    MySwal.fire({
                        title: "Blocking...",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                    const response = await blockOrganization({ OrganizationId });
                    if (response.data.success) {
                        MySwal.fire({
                            title: "Blocked!",
                            text: response.data.message,
                            icon: "success",
                        });
                        setOrganizationData((prevData) =>
                            prevData.map((item) =>
                                item._id === OrganizationId ? { ...item, isBlocked: true } : item
                            )
                        );
                    } else {
                        toast.error(response.data.message);
                    }
                }
            });
        } catch (error) {
            console.error('Error blocking organization:', error);
        }
    };
    const handleUnblock = async (OrganizationId) => {
        try {
            MySwal.fire({
                title: "Are you sure?",
                text: "You want to Unblock the organization!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Unblock!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    MySwal.fire({
                        title: "Unblocking...",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                    const response = await unblockOrganization({ OrganizationId });
                    if (response.data.success) {
                        MySwal.fire({
                            title: "Unblocked!",
                            text: response.data.message,
                            icon: "success",
                        });
                        setOrganizationData((prevData) =>
                            prevData.map((item) =>
                                item._id === OrganizationId ? { ...item, isBlocked: false } : item
                            )
                        );
                    } else {
                        toast.error(response.data.message);
                    }
                }
            });
        } catch (error) {
            console.error('Error unblocking organization:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (

        <div className='mt-5'>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='text-xl font-medium'>Organization</h1>
                    <h4 className='text-md mt-3'>A list of all the users in your account including their name, email and role.</h4>
                </div>
                <div className=''>
                    <button
                        onClick={() => navigate('/admin/new-organization')}
                        className='px-3 py-2 bg-violet-700 font-medium text-white rounded mt-5'>
                        Add Organization
                    </button>
                </div>
            </div>
            <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-10">
                <thead className='bg-slate-800 text-white'>
                    <tr className='text-center'>
                        <th className="py-2 border-b">Company Name</th>
                        <th className="py-2 border-b">Email</th>
                        <th className="py-2 border-b">Phone Number</th>
                        <th className="py-2 border-b">Location</th>
                        <th className="py-2 border-b">Free Trial</th>
                        <th className="py-2 border-b">Premium</th>
                        <th className="py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {organizationData?.map((item) => (
                        <tr key={item._id}>
                            <td className="py-2 border-b">{item.name}</td>
                            <td className="py-2 border-b">{item.email}</td>
                            <td className="py-2 border-b">{item.phoneNumber}</td>
                            <td className="py-2 border-b">{item.location}</td>
                            <td className="py-2 border-b">{item.freeTrial.endDate ? new Date(item.freeTrial.endDate).toLocaleDateString() : ''}</td>
                            <td className="py-2 border-b">{item.premium.subscriptionEndDate ? new Date(item.premium.subscriptionEndDate).toLocaleDateString() : ''}</td>
                            <td className="py-2 border-b">
                                {item.isBlocked ? (
                                    <button
                                        onClick={() => handleUnblock(item._id)}
                                        className='bg-green-700 text-white rounded-md font-semibold px-3 py-1'>
                                        Unblock
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBlock(item._id)}
                                        className='bg-red-700 text-white rounded-md font-semibold px-3 py-1'>
                                        Block
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span>
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                aria-current="page"
                                disabled
                                className="relative z-10 inline-flex items-center bg-violet-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {currentPage}
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrganizationDetails;