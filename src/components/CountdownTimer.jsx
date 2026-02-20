import { useState, useEffect } from 'react';
import '../styles/countdownTimer.css';

export default function CountdownTimer({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const difference = eventDateTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isEnded: false
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (timeLeft.isEnded) {
    return (
      <div className="countdown event-started">
        <p>🎉 Event has started!</p>
      </div>
    );
  }

  return (
    <div className="countdown">
      <h3>⏰ Event Starts In:</h3>
      <div className="countdown-container">
        <div className="countdown-item">
          <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
}
