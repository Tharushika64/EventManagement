import '../styles/eventCard.css';

export default function EventCard({ event, onViewDetails }) {
  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <span className="category-badge">{event.category}</span>
      </div>
      
      <div className="event-content">
        <h3>{event.title}</h3>
        
        <div className="event-info">
          <p className="event-date">📅 {event.date}</p>
          <p className="event-time">🕐 {event.time}</p>
          <p className="event-location">📍 {event.location}</p>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-footer">
          <span className="registered">{event.registeredCount} registered</span>
          <button 
            className="view-details-btn"
            onClick={() => onViewDetails(event.id)}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
