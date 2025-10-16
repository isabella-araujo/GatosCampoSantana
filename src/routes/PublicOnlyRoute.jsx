import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function PublicOnlyRoute() {
    const { user } = useAuth()

    if(user) {
        return <Navigate to='/admin' replace />
    } else {
        return <Outlet />
    }
}