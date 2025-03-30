import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002; // Use a different port to avoid conflicts

app.use(cors({
  origin: '*', // Allow all origins
}));

app.use(express.json());

app.post('/generate-itinerary', (req, res) => {
    const { destination, startDate, endDate, travelers, budget, interests } = req.body;

    // Mock itinerary response
    const itinerary = `Itinerary for ${destination} from ${startDate} to ${endDate} for ${travelers} travelers with a budget of ₹${budget}. Interests: ${interests}.`;

    res.json({ itinerary });
});

app.listen(PORT, () => {
    console.log(`Mock server is running on http://localhost:${PORT}`);
});
