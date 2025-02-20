import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EventServiceRequestForm({ onSubmit, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [requestType, setRequestType] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        organization: '',
        description: '',
        date: '',
        location: '',
        serviceType: '',
        eventType: '',
        status: 'pending'  // Added to match backend
    });


    const serviceOptions = Object.entries({
        PHOTOGRAPHY: 'Photography',
        VIDEOGRAPHY: 'Videography',
        SOCIAL_MEDIA: 'Social Media Management',
        CONTENT: 'Content Creation',
        BRAND: 'Brand Development',
        OTHER: 'Other'
    });


    const eventOptions = Object.entries({
        CORPORATE: 'Corporate Event',
        WEDDING: 'Wedding',
        BIRTHDAY: 'Birthday',
        CONCERT: 'Concert',
        FASHION: 'Fashion Show',
        OTHER: 'Other'
    });


    const getErrorMessage = (field) => {
        if (!errors[field]) return '';
        return (
            <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
        );
    };


    const validateField = (name, value) => {
        const newErrors = { ...errors };
        const selectedDate = new Date(value);
        const today = new Date();

        switch (name) {
            case 'title':
                if (value.length < 3) {
                    newErrors[name] = 'Title must be at least 3 characters';
                } else if (value.length > 100) {
                    newErrors[name] = 'Title must be less than 100 characters';
                } else {
                    delete newErrors[name];
                }
                break;
            case 'description':
                if (value.length < 10) {
                    newErrors[name] = 'Description must be at least 10 characters';
                } else if (value.length > 1000) {
                    newErrors[name] = 'Description must be less than 1000 characters';
                } else {
                    delete newErrors[name];
                }
                break;
            case 'date':
                if (selectedDate < today) {
                    newErrors[name] = 'Date cannot be in the past';
                } else {
                    delete newErrors[name];
                }
                break;
            default:
                if (!value && name !== 'serviceType' && name !== 'eventType') {
                    newErrors[name] = 'This field is required';
                } else {
                    delete newErrors[name];
                }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate all fields
        let isValid = true;
        Object.entries(formData).forEach(([key, value]) => {
            if (!validateField(key, value)) {
                isValid = false;
            }
        });

        if (!isValid || !requestType) {
            setIsLoading(false);
            return;
        }

        try {
            const submissionData = {
                ...formData,
                type: requestType,
                date: new Date(formData.date).toISOString().split('T')[0],
                ...(requestType === 'event'
                    ? { eventType: formData.eventType }
                    : { serviceType: formData.serviceType })
            };

            console.log('Submitting data:', submissionData);
            await onSubmit(submissionData);
            onClose();
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: error.message || 'Failed to submit request. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
        >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto relative z-10">
                <h2 className="text-2xl font-bold text-midnight mb-6">
                    Submit {requestType} Request
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <select
                            name="requestType"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-mint transition-colors
                                ${errors.requestType ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Select Request Type</option>
                            <option value="event">Event</option>
                            <option value="service">Service</option>
                        </select>
                        {getErrorMessage('requestType')}
                    </div>

                    {/* Dynamic Type Options */}
                    <AnimatePresence mode="wait">
                        {requestType && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2"
                            >
                                {requestType === 'service' && (
                                    <div>
                                        <select
                                            value={formData.serviceType}
                                            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint"
                                            required
                                        >
                                            <option value="">Select Service Type</option>
                                            {serviceOptions.map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {requestType === 'event' && (
                                    <div>
                                        <select
                                            value={formData.eventType}
                                            onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint"
                                            required
                                        >
                                            <option value="">Select Event Type</option>
                                            {eventOptions.map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-mint transition-colors
                                    ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {getErrorMessage('title')}
                        </div>
                        <input
                            type="text"
                            placeholder="Organization"
                            value={formData.organization}
                            onChange={(e) => setFormData({...formData, organization: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint"
                            required
                            maxLength={255}
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint h-32"
                            required
                            minLength={10}
                            maxLength={1000}
                        />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint"
                            required
                            min={new Date().toISOString().split('T')[0]} // Can't select past dates
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-mint"
                            required
                            maxLength={255}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-charcoal hover:text-midnight transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`bg-mint text-midnight px-6 py-2 rounded-lg
                                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-mint/80'}
                                    transition-all`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    'Submit Request'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default EventServiceRequestForm;
