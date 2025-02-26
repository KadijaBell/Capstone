import { useState } from "react";

import NotificationContext from "./NotificationContext";

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const sendNotification = async (userId, message, eventId) => {
        try {
            const response = await fetch("/api/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    user_id: userId,
                    message,
                    event_id: eventId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send notification');
            }

            const data = await response.json();
            setNotifications(prev => [...prev, data]);
            setUnreadCount(prev => prev + 1);
            return data;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`/api/notifications/${notificationId}/read`, {
                method: "PATCH",
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }

            setNotifications(prev =>
                prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            sendNotification,
            markAsRead
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
