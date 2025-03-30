import React, { useState } from 'react';

export function DiscoverJourneyApp() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary(null);

    try {
      const response = await fetch("http://localhost:3002/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          travelers,
          budget,
          interests,
        }),
      });

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trip-planner-container">
      <div className="background-overlay"></div>
      <div className="content">
        <h1> Discover Your Perfect Journey</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where do you want to go?"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Travelers</label>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Total budget in Rupees"
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Interests</label>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Adventure, culture, food, relaxation..."
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Generating Itinerary..." : "Plan My Trip 🚀"}
          </button>
        </form>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Crafting your perfect trip...</p>
          </div>
        )}

        {itinerary && (
          <div className="itinerary-result">
            <h2>Your Personalized Itinerary</h2>
            <div className="itinerary-content">
              {itinerary.split('\n').map((line, index) => (
                <div key={index} className="itinerary-line">
                  {line.startsWith('Day') ? (
                    <div className="day-header">{line}</div>
                  ) : line.trim() ? (
                    <div className="detail-line">
                      <span className="bullet">•</span>
                      {line}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
