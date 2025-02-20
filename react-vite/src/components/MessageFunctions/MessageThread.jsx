// import { useState } from 'react';
// import { format, formatDistanceToNow } from 'date-fns';

// function MessageThread({
//     message,
//     onReply,
//     onDelete,
//     onEdit,
//     onStatusChange,
//     threadMessages,
//     // onViewThread
// }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editContent, setEditContent] = useState(message.content);
//     const [isThreadVisible, setIsThreadVisible] = useState(false);

//     const getRecipientInfo = () => {
//         if (message.event_id) {
//             return `Event: ${message.event_title || 'Unknown Event'}`;
//         }
//         if (message.recipient_id) {
//             return `To: ${message.recipient_name} (${message.recipient_email})`;
//         }
//         return 'No recipient';
//     };

//     const formatMessageTime = (dateString) => {
//         const date = new Date(dateString);
//         return {
//             relative: formatDistanceToNow(date, { addSuffix: true }),
//             exact: format(date, 'MMM d, yyyy h:mm a')
//         };
//     };

//     const StatusBadge = ({ status }) => {
//         const colors = {
//             unread: 'bg-red-100 text-red-700 border-red-200',
//             read: 'bg-green-100 text-green-700 border-green-200',
//             archived: 'bg-gray-100 text-gray-700 border-gray-200'
//         };

//         return (
//             <span className={`px-2 py-1 text-xs rounded-full border ${colors[status]}`}>
//                 {status.charAt(0).toUpperCase() + status.slice(1)}
//             </span>
//         );
//     };

// //     return (
//     <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all p-4">
//     {/* Message Header */}
//     <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
//                 <i className="fas fa-user text-gold"></i>
//             </div>
//             <div>
//                 <h4 className="font-medium text-gray-900">
//                     {message.is_admin_message ? 'Admin' : message.sender_name}
//                 </h4>
//                 <p className="text-sm text-gray-600">{getRecipientInfo()}</p>
//             </div>
//         </div>
//         <div className="flex items-center gap-3">
//             <StatusBadge status={message.status} />
//             <span
//                 className="text-sm text-gray-500"
//                 title={formatMessageTime(message.created_at).exact}
//             >
//                 {formatMessageTime(message.created_at).relative}
//             </span>
//         </div>
//     </div>

//     {/* Message Content */}
//     <div className="mt-3">
//         {isEditing ? (
//             <textarea
//                 value={editContent}
//                 onChange={(e) => setEditContent(e.target.value)}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold/50"
//                 rows="3"
//             />
//         ) : (
//             <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
//         )}
//     </div>

//     {/* Actions Bar */}
//     <div className="flex items-center justify-between mt-2">
//         <div className="flex gap-3">
//             <button
//                 onClick={() => setIsThreadVisible(!isThreadVisible)}
//                 className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
//             >
//                 <i className={`fas fa-chevron-${isThreadVisible ? 'up' : 'down'} mr-1`}></i>
//                 {threadMessages.length} {threadMessages.length === 1 ? 'Reply' : 'Replies'}
//             </button>
//             <button
//                 onClick={() => onReply(message.id)}
//                 className="text-sm text-gold hover:text-gold/80"
//             >
//                 <i className="fas fa-reply mr-1"></i> Reply
//             </button>
//         </div>
//         <div className="flex gap-2">
//             {!isEditing ? (
//                 <>
//                     <button
//                         onClick={() => setIsEditing(true)}
//                         className="text-sm text-blue-500 hover:text-blue-600"
//                     >
//                         <i className="fas fa-edit"></i>
//                     </button>
//                     <button
//                         onClick={() => onDelete(message.id)}
//                         className="text-sm text-red-500 hover:text-red-600"
//                     >
//                         <i className="fas fa-trash"></i>
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <button
//                         onClick={() => {
//                             onEdit(message.id, editContent);
//                             setIsEditing(false);
//                         }}
//                         className="text-sm text-green-500 hover:text-green-600"
//                     >
//                         <i className="fas fa-check"></i>
//                     </button>
//                     <button
//                         onClick={() => setIsEditing(false)}
//                         className="text-sm text-gray-500 hover:text-gray-600"
//                     >
//                         <i className="fas fa-times"></i>
//                     </button>
//                 </>
//             )}
//         </div>
//     </div>

//     {/* Mark as Read/Unread */}
//     <div className="mt-3 flex justify-end">
//         <button
//             onClick={() => onStatusChange(message.id, message.status === "read" ? "unread" : "read")}
//             className={`text-sm ${message.status === "unread" ? "text-green-500" : "text-gray-500"}`}
//         >
//             {message.status === "unread" ? "Mark as Read" : "Mark as Unread"}
//         </button>
//     </div>

//     {/* Thread Section */}
//     {isThreadVisible && threadMessages.length > 0 && (
//         <div className="border-t border-gray-100 mt-4">
//             {threadMessages.map((reply, index) => (
//                 <div
//                     key={reply.id}
//                     className={`p-4 ${
//                         index !== threadMessages.length - 1 ? 'border-b border-gray-100' : ''
//                     }`}
//                 >
//                     <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//                             <i className="fas fa-user text-gray-500 text-sm"></i>
//                         </div>
//                         <div className="flex-1">
//                             <div className="flex justify-between items-start">
//                                 <p className="font-medium text-sm">
//                                     {reply.is_admin_message ? 'Admin' : reply.sender_name}
//                                 </p>
//                                 <span className="text-xs text-gray-500">
//                                     {formatMessageTime(reply.created_at).relative}
//                                 </span>
//                             </div>
//                             <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )}
// </div>
// }

// export default MessageThread;

import { useState, useRef, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";


function MessageThread({
  message,
  onReply,
  onDelete,
  onEdit,
  onStatusChange,
  threadMessages = [],
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isExpanded && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExpanded, threadMessages]);

  const getRecipientInfo = () => {
    if (message.event_id) {
      return `Event: ${message.event_title || "Unknown Event"}`;
    }
    if (message.recipient_id) {
      return `To: ${message.recipient_name} (${message.recipient_email})`;
    }
    return "No recipient";
  };

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      exact: format(date, "MMM d, yyyy h:mm a"),
    };
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      unread: "bg-red-100 text-red-700 border-red-200",
      read: "bg-green-100 text-green-700 border-green-200",
      archived: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

    return (
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all p-4"
    >
      {/* Message Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <i className="fas fa-user text-gold"></i>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {message.is_admin_message ? "Admin" : message.sender_name}
            </h4>
            <p className="text-sm text-gray-600">{getRecipientInfo()}</p>
          </div>
                </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={message.status} />
          <span
            className="text-sm text-gray-500"
            title={formatMessageTime(message.created_at).exact}
          >
            {formatMessageTime(message.created_at).relative}
          </span>
        </div>
            </div>

      {/* Message Content */}
      <div className="mt-3">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold/50"
            rows="3"
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
        )}
                        </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <i className={`fas fa-chevron-${isExpanded ? "up" : "down"} mr-1`}></i>
            {threadMessages.length} {threadMessages.length === 1 ? "Reply" : "Replies"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onReply(message.id)}
            className="text-sm text-gold hover:text-gold/80"
          >
            <i className="fas fa-reply mr-1"></i> Reply
          </motion.button>
                </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                <i className="fas fa-edit"></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(message.id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                <i className="fas fa-trash"></i>
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onEdit(message.id, editContent);
                  setIsEditing(false);
                }}
                className="text-sm text-green-500 hover:text-green-600"
              >
                <i className="fas fa-check"></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-500 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Mark as Read/Unread */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-3 flex justify-end"
      >
            <button
          onClick={() =>
            onStatusChange(message.id, message.status === "read" ? "unread" : "read")
          }
          className={`text-sm ${message.status === "unread" ? "text-green-500" : "text-gray-500"}`}
        >
          {message.status === "unread" ? "Mark as Read" : "Mark as Unread"}
            </button>
      </motion.div>

      {/* Thread Section */}
      <AnimatePresence>
        {isExpanded && threadMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 mt-4"
          >
            {threadMessages.map((reply, index) => (
              <div key={reply.id} className={`p-4 ${index !== threadMessages.length - 1 ? "border-b border-gray-100" : ""}`}>
                <p className="text-sm text-gray-700">{reply.content}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
        </motion.div>
    );
}

export default MessageThread;
