import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://servocci-backend-dip7.onrender.com/api/employee/lead-summary",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    return (

        <DashboardContext.Provider
            value={{
                dashboard,
                loading,
                refreshDashboard: fetchDashboard
            }}
        >
            {children}
        </DashboardContext.Provider>

    );

}

export const useDashboard = () => useContext(DashboardContext);