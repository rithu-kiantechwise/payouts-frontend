import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const OrganizationProtectedRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("organizationToken");
    const user = useSelector((state) => state.user.user);
    console.log(user, 'qwerty');
    if (user?.freeTrail?.endDate > new Date()) {
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
                MySwal.fire({
                    title: "Deleted!",
                    // text: response.data.message,
                    icon: "success",
                });
                navigate('/organization/login');
            } else {
                navigate('/organization/register')
            }
        });
    }

    return token ? (
        <Outlet />
    ) : (
        <Navigate to={"/organization/login"} />
    );
};

export default OrganizationProtectedRoute;