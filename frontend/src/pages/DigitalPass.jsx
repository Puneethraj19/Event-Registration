import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRegistrationById, fetchEventById } from '../api/api';

const DigitalPass = () => {
    const { id } = useParams();
    const [registration, setRegistration] = useState(null);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getDetails = async () => {
            try {
                const regRes = await fetchRegistrationById(id);
                setRegistration(regRes.data);

                const eventRes = await fetchEventById(regRes.data.eventId);
                setEvent(eventRes.data);
                setLoading(false);
            } catch (err) {
                console.error('Error loading digital pass:', err);
                setError('Failed to load digital pass. Please ensure the link is correct.');
                setLoading(false);
            }
        };
        getDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <div className="saas-loader" style={{ marginBottom: '20px' }}></div>
                <p style={{ color: 'var(--n-500)', fontSize: '1.1rem' }}>Digital pass is being generated. Please wait...</p>
            </div>
        );
    }

    if (error || !registration || !event) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Error</h2>
                <p>{error || 'Registration details missing.'}</p>
                <Link to="/" className="btn-saas" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="container fade-in-up">
            <div style={{ maxWidth: '500px', margin: '40px auto' }}>
                <div className="success-icon" style={{ margin: '0 auto 24px', background: 'var(--brand-primary)', color: 'white' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>

                <div className="registration-form-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))', padding: '32px', color: 'white', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Official Access Pass</span>
                        <h2 style={{ fontSize: '2rem', marginTop: '8px', color: 'white' }}>{event.name}</h2>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--n-400)', textTransform: 'uppercase' }}>Attendee Name</label>
                                <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--n-900)' }}>{registration.name}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--n-400)', textTransform: 'uppercase' }}>Email</label>
                                    <p style={{ fontWeight: '500', color: 'var(--n-700)' }}>{registration.email}</p>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--n-400)', textTransform: 'uppercase' }}>Phone</label>
                                    <p style={{ fontWeight: '500', color: 'var(--n-700)' }}>{registration.phone}</p>
                                </div>
                            </div>

                            <div style={{ padding: '20px', background: 'var(--n-50)', borderRadius: '12px', textAlign: 'center', marginTop: '10px' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--n-400)', textTransform: 'uppercase', marginBottom: '8px' }}>Registration ID</div>
                                <code style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--brand-primary)', letterSpacing: '2px' }}>{registration._id.slice(-8).toUpperCase()}</code>
                                <div style={{ marginTop: '16px', opacity: 0.5 }}>
                                    {/* QR Placeholder */}
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="9" y="9" width="1" height="1"></rect><rect x="14" y="9" width="1" height="1"></rect><rect x="9" y="14" width="1" height="1"></rect></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '20px', borderTop: '1px dashed var(--n-200)', textAlign: 'center', color: 'var(--n-500)', fontSize: '0.875rem' }}>
                        Scan at entry for validation
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link to="/" className="btn-link">Back to Event Hub</Link>
                </div>
            </div>
        </div>
    );
};

export default DigitalPass;
