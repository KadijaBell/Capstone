// export const fetchAPI = async (url, options = {}) => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...options.headers,
//       },
//       ...options,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };
export const fetchAPI = async (url, options = {}) => {
    try {
      const token = localStorage.getItem("authToken");
      // Ensure the URL starts with the base API URL
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5173';
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

      const defaultHeaders = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `HTTP error! status: ${response.status}`
        }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        throw new Error("Response was not JSON");
      }

    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  };
