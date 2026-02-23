import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../api/api';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const { data } = await fetchEventById(id);
                setEvent(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setLoading(false);
            }
        };
        getEvent();
    }, [id]);

    if (loading) return <div className="saas-loader">Preparing your exclusive preview...</div>;
    if (!event) return <div className="error">Invite not found.</div>;

    return (
        <div className="event-details-page fade-in">
            <div className="details-hero">
                <div className="container">
                    <div className="badge">Featured Experience</div>
                    <h2>{event.name}</h2>
                    <div className="meta-item" style={{ marginTop: '1rem' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{event.location}</span>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="details-content">
                    <div className="details-main">
                        <h3>About this event</h3>
                        <p className="description-saas" style={{ fontSize: '1.1rem', webkitLineClamp: 'initial' }}>
                            {event.description}
                        </p>

                        <div className="card-meta" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <div className="meta-item">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <div>
                                    <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Date & Time</p>
                                    <p>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="details-sidebar">
                        <div className="booking-card">
                            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Secure your spot</h4>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
                                Join hundreds of industry professionals at this exclusive gathering.
                            </p>
                            <Link to={`/register/${event._id}`} className="btn-saas">Register for Invite</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
