import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, getAllEmployees } from '../../api/OrganizationApi';
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployeeData(response.data?.employees)
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    const handleDelete = async (employeeID) => {
        try {
            MySwal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    MySwal.fire({
                        title: "Deleting...",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                    const response = await deleteEmployee(employeeID);
                    MySwal.fire({
                        title: "Deleted!",
                        text: response.data.message,
                        icon: "success",
                    });
                    setEmployeeData((employeeData) => employeeData.filter((employee) => employee._id !== employeeID));
                }
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    const handleEdit = async (employeeID) => {
        try {
            navigate(`/organization/edit-employee`, { state: { employeeID } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    const handleDetails = async (employeeID) => {
        try {
            navigate(`/organization/employee-single`, { state: { employeeID } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, [])
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[70%] p-8'>
                <div className=''>
                    <h1 className='text-xl font-semibold'>Create New Employee</h1>
                <button
                    onClick={() => navigate('/organization/new-employee')}
                    className='px-4 py-3 bg-blue-600 text-white font-medium rounded mt-5'>
                    New Employee
                </button>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Employee Details</h1>
                    <table className="min-w-full bg-white border-gray-300 border rounded-lg mt-5">
                        <thead className='text-left'>
                            <tr>
                                <th className="py-2 px-4 border-b">EmployeeID</th>
                                <th className="py-2 px-4 border-b">FullName</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Position</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData?.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border-b">{item.employeeID}</td>
                                    <td className="py-2 px-4 border-b">{item.firstName + ' ' + item.lastName}</td>
                                    <td className="py-2 px-4 border-b">{item.email}</td>
                                    <td className="py-2 px-4 border-b">{item.position}</td>
                                    <td className="flex gap-2 py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(item._id)}
                                            className='text-white bg-green-500 font-medium px-3 py-1 rounded'>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className='text-white bg-red-500 font-medium px-3 py-1 rounded'>
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleDetails(item._id)}
                                            className='text-white bg-blue-500 font-medium px-3 py-1 rounded'>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails;