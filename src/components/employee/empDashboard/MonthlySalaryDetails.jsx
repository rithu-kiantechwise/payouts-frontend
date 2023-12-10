import React, { useEffect, useState } from 'react'
import { getSalaryDetails } from '../../../api/EmployeeApi';

const calculateHoursWorked = (checkInTime, checkOutTime) => {
    const diffInMilliseconds = new Date(checkOutTime) - new Date(checkInTime);
    const hoursWorked = diffInMilliseconds / (1000 * 60 * 60);
    return hoursWorked.toFixed(2);
};

const MonthlySalaryDetails = () => {
    const [salaryDetails, setSalaryDetails] = useState(null);

    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                const response = await getSalaryDetails();
                setSalaryDetails(response.data.salaryDetailsByMonth);
            } catch (error) {
                console.error("Error fetching salary details:", error);
            }
        };
        fetchSalaryDetails();
    }, []);
    return (
        <div className='p-2'>
            <h2 className='text-2xl font-semibold p-5'>Monthly Salary Details</h2>
            <table className="min-w-full bg-white border-gray-300 border rounded-lg">
                <thead>
                    <tr className='text-center'>
                        <th className="py-2 px-4 border-b">Month</th>
                        <th className="py-2 px-4 border-b">Attendance</th>
                        <th className="py-2 px-4 border-b">Leaves</th>
                        <th className="py-2 px-4 border-b">Reimbursements</th>
                        <th className="py-2 px-4 border-b">Total Leave Days</th>
                        <th className="py-2 px-4 border-b">Actual Salary</th>
                        <th className="py-2 px-4 border-b">Total Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {salaryDetails?.map((data) => (
                        <tr className='text-center' key={data.month}>
                            <td>{data.month}</td>
                            <td className="py-2 px-4 border-b">
                                <ul>
                                    {data.attendance.map((entry) => (
                                        <li key={entry._id}>
                                            {new Date(entry.checkInTime).toLocaleDateString()} - {calculateHoursWorked(entry.checkInTime, entry.checkOutTime)} hours
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <ul>
                                    {data.leaves.map((leave) => (
                                        <li key={leave._id}>
                                            {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <ul>
                                    {data.reimbursements.map((reimbursement) => (
                                        <li key={reimbursement._id}>
                                            {reimbursement.amount}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="py-2 px-4 border-b">
                                {data.totalLeaveDays}
                            </td>
                            <td className="py-2 px-4 border-b">
                                ₹ {data.actualSalary}
                            </td>
                            <td className="py-2 px-4 border-b">
                                ₹ {data.totalSalary}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MonthlySalaryDetails;