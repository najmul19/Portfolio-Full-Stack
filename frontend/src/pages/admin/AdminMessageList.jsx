import { useEffect, useState } from 'react';
import messageService from '../../services/messageService';

const AdminMessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const data = await messageService.getAll();
            setMessages(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkRead = async (id, currentStatus) => {
        try {
            await messageService.updateStatus(id, { read: !currentStatus });
            loadMessages();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                await messageService.delete(id);
                loadMessages();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Inbox</h1>
            <div className="space-y-4">
                {messages.length === 0 && <p className="text-gray-400">No messages yet.</p>}

                {messages.map(msg => (
                    <div key={msg._id} className={`p-4 rounded border ${msg.read ? 'bg-secondary border-transparent' : 'bg-secondary border-accent'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold">{msg.subject}</h3>
                                <p className="text-sm text-gray-400">From: {msg.name} ({msg.email})</p>
                            </div>
                            <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-300 mb-4 whitespace-pre-wrap">{msg.message}</p>
                        <div className="flex gap-4 text-sm">
                            <button
                                onClick={() => handleMarkRead(msg._id, msg.read)}
                                className={`${msg.read ? 'text-gray-400' : 'text-accent'} hover:underline`}
                            >
                                {msg.read ? 'Mark as Unread' : 'Mark as Read'}
                            </button>
                            <button onClick={() => handleDelete(msg._id)} className="text-red-400 hover:text-red-300">Delete</button>
                            <a href={`mailto:${msg.email}`} className="text-blue-400 hover:underline">Reply</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMessageList;
