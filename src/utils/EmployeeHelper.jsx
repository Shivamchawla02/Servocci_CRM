import axios from 'axios';

// Fetch all departments (institutions) from backend
export const fetchDepartments = async () => {
  try {
    const response = await axios.get('https://servocci-backend.onrender.com/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments;
    } else {
      console.error("Failed to fetch departments:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};
