export const fetchAPI = async (url, options = {}) => {
const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];

    const defaultHeaders = {
        "Content-Type": "application/json",
        ...(csrfToken && { "X-CSRF-TOKEN": csrfToken })  
    };

    const response = await fetch(url, {
        credentials: "include",
        headers: { ...defaultHeaders, ...options.headers },
        ...options
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};
// export const fetchAPI = async (url, options = {}) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       // Ensure the URL starts with the base API URL
//       const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5173';
//       const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

//       const defaultHeaders = {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       };

//       console.log('Fetching URL:', fullUrl); // Add this for debugging

//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           ...defaultHeaders,
//           ...options.headers,
//         },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({
//           error: `HTTP error! status: ${response.status}`
//         }));
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//       }

//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.includes("application/json")) {
//         return await response.json();
//       } else {
//         throw new Error("Response was not JSON");
//       }

//     } catch (error) {
//       console.error("API Fetch Error:", error);
//       throw error;
//     }
//   };
