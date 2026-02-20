import { useParams, useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { eventsData } from '../data/events';
import '../styles/eventDetails.css';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event not found</h2>
        <button onClick={() => navigate('/')}>Back to Events</button>
      </div>
    );
  }

  const handleRegister = () => {
    navigate(`/register/${event.id}`);
  };

  return (
    <div className="event-details">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Events
      </button>

      <div className="event-banner">
        <img src={event.image} alt={event.title} />
        <div className="banner-overlay">
          <span className="category-badge">{event.category}</span>
        </div>
      </div>

      <div className="container event-details-container">
        <div className="event-main">
          <h1>{event.title}</h1>

          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <div>
                <strong>Date</strong>
                <p>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div className="meta-item">
              <span className="meta-icon">🕐</span>
              <div>
                <strong>Time</strong>
                <p>{event.time}</p>
              </div>
            </div>

            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="meta-item">
              <span className="meta-icon">👥</span>
              <div>
                <strong>Registered</strong>
                <p>{event.registeredCount} people</p>
              </div>
            </div>
          </div>

          <div className="event-description">
            <h2>About this Event</h2>
            <p>{event.fullDescription}</p>
          </div>

          <div className="event-speakers">
            <h2>Speakers</h2>
            <div className="speakers-list">
              {event.speakers.map((speaker, idx) => (
                <div key={idx} className="speaker">
                  <span className="speaker-icon">🎤</span>
                  <p>{speaker}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="event-sidebar">
          <CountdownTimer eventDate={`${event.date} ${event.time}`} />

          <button 
            className="register-btn"
            onClick={handleRegister}
          >
            Register Now 🎫
          </button>

          <div className="event-share">
            <h3>Share Event</h3>
            <div className="share-buttons">
              <button className="share-btn">📱 Share</button>
              <button className="share-btn">❤️ Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
