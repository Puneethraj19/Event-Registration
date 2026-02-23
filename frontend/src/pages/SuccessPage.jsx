import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SuccessPage = () => {
    const location = useLocation();
    const registration = location.state?.registration;

    useEffect(() => {
        if (registration?._id) {
            localStorage.setItem('latestRegistrationId', registration._id);
        }
    }, [registration]);

    const digitalPassId = registration?._id || localStorage.getItem('latestRegistrationId');

    return (
        <div className="container fade-in">
            <div className="success-card">
                <div className="success-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Success!</h2>
                <p className="description-saas" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
                    Your invitation is confirmed. We've sent the event details and access pass to your work email.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link to="/" className="btn-saas">Explore More Events</Link>
                    {digitalPassId && (
                        <Link to={`/digital-pass/${digitalPassId}`} className="btn-link" style={{ fontSize: '0.9375rem' }}>
                            View My Digital Pass
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
