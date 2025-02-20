export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved':
            return 'text-green-600';
        case 'pending':
            return 'text-yellow-600';
        case 'denied':
        case 'rejected':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
};
