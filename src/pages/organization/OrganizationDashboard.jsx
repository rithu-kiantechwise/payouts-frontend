import React, { useEffect, useState } from 'react'
import { getReimbursement } from '../../api/OrganizationApi';
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import { Message, ProductDisplay } from '../../components/organization/premiumPurchase/PremiumButton';

const OrganizationDashboard = () => {
    const [reimbursements, setReimbursements] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getReimbursement();
            console.log(response.data?.reimbursement);
            setReimbursements(response.data?.reimbursement)

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
            <div className='min-w-[80%] mx-auto p-8'>
                    <ProductDisplay />
                <h1 className='text-2xl font-semibold mb-5'>Reimbursement Claims</h1>
                <table className="min-w-full bg-white border-gray-300 border rounded-lg">
                    <thead className='text-left'>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Employee ID</th>
                            <th className="py-2 px-4 border-b">Full Name</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reimbursements.map((reimbursement) => (
                            <tr key={reimbursement?._id}>
                                <td className="py-2 px-4 border-b">
                                    <img src={reimbursement?.imageUrl} alt="reimbursementImg" className='w-10 h-10' />
                                </td>
                                <td className="py-2 px-4 border-b">{reimbursement.employeeId?.employeeID}</td>
                                <td className="py-2 px-4 border-b">{reimbursement.employeeId?.firstName + ' ' + reimbursement.employeeId?.lastName}</td>
                                <td className="py-2 px-4 border-b">{reimbursement?.amount}</td>
                                <td className="py-2 px-4 border-b">{reimbursement?.description}</td>
                                <td className="py-2 px-4 border-b">{reimbursement?.status}</td>
                                <td className="py-2 px-4 border-b">
                                    <button>
                                        update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default OrganizationDashboard;