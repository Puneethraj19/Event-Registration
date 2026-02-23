import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/api';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getEvents = async () => {
            try {
                // Initial delay for skeleton demonstration (can be removed later)
                await new Promise(resolve => setTimeout(resolve, 800));
                const { data } = await fetchEvents();
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    const filteredEvents = events.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getBannerColor = (name) => {
        if (name.toLowerCase().includes('tech')) return 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)';
        if (name.toLowerCase().includes('design')) return 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)';
        return 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)';
    };

    const getCategory = (name) => {
        if (name.toLowerCase().includes('tech')) return 'Technology';
        if (name.toLowerCase().includes('design')) return 'Design';
        return 'Community';
    };

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '100px' }}>
                <div className="event-grid-saas">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="card-saas">
                            <div className="skeleton sk-banner"></div>
                            <div className="skeleton sk-title"></div>
                            <div className="skeleton sk-text"></div>
                            <div className="skeleton sk-text" style={{ width: '70%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="event-list-page">
            {/* Hero Section */}
            <section className="hero-saas fade-in-up">
                <div className="container">
                    <h1 className="hero-gradient-text">Experience the next generation of professional events.</h1>
                    <p className="hero-subtitle">Join thousands of leaders and creators at the world's most influential gatherings. Curated, connected, and completely seamless.</p>
                    <div className="hero-actions" style={{ justifyContent: 'center' }}>
                        <a href="#explore" className="btn btn-primary">Explore Events</a>
                        <a href="#" className="btn btn-secondary">Learn More</a>
                    </div>
                </div>
            </section>

            <main className="container" id="explore">
                {/* Section Header */}
                <div className="section-head-saas fade-in-up delay-1">
                    <div className="section-title-group">
                        <span className="label-sm">UPCOMING EVENTS</span>
                        <h2>Find your next experience</h2>
                    </div>
                    <div className="section-filters">
                        <div className="search-input-wrapper">
                            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--n-400)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input
                                type="text"
                                placeholder="Search events or locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select className="btn btn-ghost" style={{ paddingRight: '2rem' }}>
                            <option>All Categories</option>
                            <option>Technology</option>
                            <option>Design</option>
                            <option>Networking</option>
                        </select>
                    </div>
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="fade-in-up delay-2" style={{ textAlign: 'center', padding: '100px 0', border: '1px dashed var(--n-200)', borderRadius: 'var(--radius-2xl)' }}>
                        <p style={{ color: 'var(--n-500)', fontSize: '1.1rem' }}>No events matches your search. Try different keywords.</p>
                    </div>
                ) : (
                    <div className="event-grid-saas">
                        {filteredEvents.map((event, index) => {
                            const eventDate = new Date(event.date);
                            const day = eventDate.getDate();
                            const month = eventDate.toLocaleString('default', { month: 'short' });

                            return (
                                <div key={event._id} className={`card-saas fade-in-up delay-${(index % 3) + 1}`}>
                                    <div className="card-banner-wrapper">
                                        <div className="card-img-placeholder" style={{ background: getBannerColor(event.name) }}>
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                        </div>
                                        <div className="card-badge-premium">{getCategory(event.name)}</div>
                                        <div className="date-chip-overlay">
                                            <span className="day">{day}</span>
                                            <span className="mon">{month}</span>
                                        </div>
                                    </div>

                                    <div className="card-body-saas">
                                        <h3>{event.name}</h3>

                                        <div className="card-meta-saas">
                                            <div className="meta-item-saas">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                <span>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {eventDate.toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                                            </div>
                                            <div className="meta-item-saas">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <p className="card-desc-saas">{event.description}</p>

                                        <div className="card-footer-saas">
                                            <div className="attendee-group">
                                                <div className="avatar-stack">
                                                    <div className="stack-item" style={{ background: '#f87171' }}></div>
                                                    <div className="stack-item" style={{ background: '#60a5fa' }}></div>
                                                    <div className="stack-item" style={{ background: '#34d399' }}></div>
                                                </div>
                                                <span className="stack-text">Joined by 120+ pioneers</span>
                                            </div>

                                            <div className="actions-row">
                                                <Link to={`/event/${event._id}`} className="btn btn-primary">View Details</Link>
                                                <Link to={`/register/${event._id}`} className="btn btn-ghost">Register</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default EventList;
