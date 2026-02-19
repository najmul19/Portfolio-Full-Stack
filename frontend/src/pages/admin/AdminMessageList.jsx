import { useEffect, useState } from 'react';
import { FaTrash, FaEnvelope, FaEnvelopeOpen, FaReply, FaCheckDouble } from 'react-icons/fa';
import messageService from '../../services/messageService';

const AdminMessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        setLoading(true);
        try {
            const data = await messageService.getAll();
            // Sort by date descending (newest first)
            const sortedMessages = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id, currentStatus) => {
        try {
            // Optimistic update
            setMessages(prev => prev.map(msg =>
                msg._id === id ? { ...msg, read: !currentStatus } : msg
            ));
            await messageService.updateStatus(id, { read: !currentStatus });
        } catch (error) {
            console.error('Error updating status:', error);
            loadMessages(); // Revert on error
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message? This cannot be undone.')) {
            try {
                // Optimistic update
                setMessages(prev => prev.filter(msg => msg._id !== id));
                await messageService.delete(id);
            } catch (error) {
                console.error('Error deleting message:', error);
                loadMessages(); // Revert on error
            }
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Inbox</h1>
                    <p className="text-gray-400">
                        You have {messages.filter(m => !m.read).length} unread messages
                    </p>
                </div>
                <button
                    onClick={loadMessages}
                    className="text-accent hover:underline text-sm"
                >
                    Refresh
                </button>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="bg-secondary rounded-lg p-12 text-center text-gray-400 border border-gray-700">
                        <FaEnvelopeOpen className="mx-auto text-4xl mb-4 opacity-50" />
                        <p className="text-xl">Your inbox is empty</p>
                    </div>
                ) : (
                    messages.map(msg => (
                        <div
                            key={msg._id}
                            className={`group relative p-6 rounded-lg border transition-all duration-200 ${msg.read
                                    ? 'bg-secondary/50 border-gray-700'
                                    : 'bg-secondary border-accent shadow-lg shadow-accent/5'
                                }`}
                        >
                            {/* Unread Indicator */}
                            {!msg.read && (
                                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent animate-pulse"></div>
                            )}

                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${msg.read ? 'bg-gray-700 text-gray-400' : 'bg-accent text-primary'
                                    }`}>
                                    {getInitials(msg.name)}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                        <div>
                                            <h3 className={`font-bold text-lg ${msg.read ? 'text-gray-300' : 'text-white'}`}>
                                                {msg.subject}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <span className="font-medium text-gray-300">{msg.name}</span>
                                                <span>&bull;</span>
                                                <span>{msg.email}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">
                                            {new Date(msg.createdAt).toLocaleString(undefined, {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </span>
                                    </div>

                                    <div className={`mt-3 p-4 rounded bg-dark-bg/50 text-sm leading-relaxed whitespace-pre-wrap ${msg.read ? 'text-gray-400' : 'text-gray-200'
                                        }`}>
                                        {msg.message}
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-700/50">
                                        <button
                                            onClick={() => handleMarkRead(msg._id, msg.read)}
                                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${msg.read ? 'text-gray-400 hover:text-white' : 'text-accent hover:text-accent/80'
                                                }`}
                                        >
                                            {msg.read ? <><FaEnvelopeOpen /> Mark Unread</> : <><FaEnvelope /> Mark Read</>}
                                        </button>

                                        <a
                                            href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                            className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <FaReply /> Reply
                                        </a>

                                        <div className="flex-grow"></div>

                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Delete Message"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminMessageList;
