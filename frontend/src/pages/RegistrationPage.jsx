import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEventById, registerUser } from '../api/api';

const RegistrationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});

    useEffect(() => {
        const getEvent = async () => {
            try {
                const { data } = await fetchEventById(id);
                setEvent(data);
            } catch (err) {
                console.error('Error fetching event:', err);
            }
        };
        getEvent();
    }, [id]);

    const validate = (name, value) => {
        if (!value) return 'Field is required';
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return 'Enter a valid email';
        if (name === 'phone' && !/^\d{10}$/.test(value)) return 'Enter 10-digit number';
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (touched[name]) {
            setErrors({ ...errors, [name]: validate(name, value) });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: validate(name, value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const err = validate(key, formData[key]);
            if (err) newErrors[key] = err;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched({ name: true, email: true, phone: true });
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await registerUser({ ...formData, eventId: id });
            navigate('/success', { state: { registration: res.data, event } });
        } catch (err) {
            setErrors({ server: err.response?.data?.message || 'Registration failed. Please try again.' });
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && /^\d{10}$/.test(formData.phone);

    if (!event) return <div className="saas-loader">Preparing your invitation...</div>;

    const eventDate = new Date(event.date);

    return (
        <div className="registration-page fade-in-up">
            <div className="container">
                <main className="registration-container-saas">
                    {/* Left Column: Event Summary */}
                    <aside className="event-summary-card">
                        <div className="summary-banner">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                <line x1="4" y1="22" x2="4" y2="15"></line>
                            </svg>
                        </div>
                        <div className="summary-content">
                            <div className="spot-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                Limited spots remaining
                            </div>
                            <h2>{event.name}</h2>
                            <p style={{ color: 'var(--n-500)', marginBottom: 'var(--s-8)' }}>{event.description}</p>

                            <div className="meta-box-saas">
                                <div className="meta-item-saas">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    <span>{eventDate.toLocaleDateString(undefined, { dateStyle: 'full' })} at {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="meta-item-saas">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Registration Form */}
                    <section className="registration-form-card">
                        <header className="form-header-saas">
                            <span className="step-indicator">Step 1 of 1 • Your Details</span>
                            <h1>Join the Event</h1>
                            <p>Enter your information to secure your access pass.</p>
                        </header>

                        {errors.server && <div className="error" style={{ marginBottom: '2rem' }}>{errors.server}</div>}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className={`field-group-saas ${touched.name && !errors.name ? 'field-success' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder=" "
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="name"
                                />
                                <label htmlFor="name">Full Name</label>
                                <span className="validation-msg">{touched.name && errors.name}</span>
                            </div>

                            <div className={`field-group-saas ${touched.email && !errors.email ? 'field-success' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="email"
                                />
                                <label htmlFor="email">Work Email</label>
                                <span className="validation-msg">{touched.email && errors.email}</span>
                            </div>

                            <div className={`field-group-saas ${touched.phone && !errors.phone ? 'field-success' : ''}`}>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder=" "
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="tel"
                                />
                                <label htmlFor="phone">Phone Number</label>
                                <span className="validation-msg">{touched.phone && errors.phone}</span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', height: '64px', fontSize: '1.1rem' }}
                                disabled={isSubmitting || !isFormValid}
                            >
                                {isSubmitting ? <div className="spinner"></div> : 'Confirm Attendance'}
                            </button>

                            <div className="secure-tag">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <span>Your data is encrypted and secure</span>
                            </div>

                            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--n-400)', marginTop: 'var(--s-8)' }}>
                                By confirming, you agree to our <a href="#" style={{ color: 'var(--brand-primary)' }}>Terms</a> and <a href="#" style={{ color: 'var(--brand-primary)' }}>Privacy Policy</a>.
                            </p>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default RegistrationPage;
