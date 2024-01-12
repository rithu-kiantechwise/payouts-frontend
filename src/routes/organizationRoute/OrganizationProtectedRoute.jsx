import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const OrganizationProtectedRoute = () => {
    const token = localStorage.getItem("organizationToken");
    const user = useSelector((state) => state?.user?.user);

    if (!token) {
        return <Navigate to={"/organization/login"} />;
    }

    if (user) {
        const premiumEndDate = user?.premium?.subscriptionEndDate
        const premiumDateCheck = new Date(premiumEndDate) > new Date();

        const freeTrialEndDate = user?.freeTrial?.endDate
        const freeTrialDateCheck = new Date(freeTrialEndDate) > new Date();

        if ((user?.premium?.isActive && premiumDateCheck) || (user?.freeTrial?.isActive && freeTrialDateCheck)) {
            return <Outlet />;
        } else {
            <Navigate to={"/organization/payment"} />
        }
    }

    return token ? (
        <Outlet />
    ) : (
        <Navigate to={"/organization/login"} />
    );

};

export default OrganizationProtectedRoute;