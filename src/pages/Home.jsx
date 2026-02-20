import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/events';
import '../styles/home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(eventsData.filter(event => event.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178f50902556?w=1200&h=500&fit=crop" 
            alt="Events Hero Banner"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Discover Amazing Events</h1>
          <p>Workshops, Tech Conferences, and Concerts - All in One Place</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>{eventsData.length}</h3>
              <p>Events</p>
            </div>
            <div className="stat">
              <h3>{eventsData.reduce((acc, e) => acc + e.registeredCount, 0).toLocaleString()}</h3>
              <p>Registrations</p>
            </div>
            <div className="stat">
              <h3>3</h3>
              <p>Categories</p>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="events-info">
            <h2>
              {selectedCategory === 'All' 
                ? 'All Events' 
                : `${selectedCategory} Events`}
            </h2>
            <p>{filteredEvents.length} events found</p>
          </div>

          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="no-events">
                <p>No events found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
