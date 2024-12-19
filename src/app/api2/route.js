import path from 'path';
import fs from 'fs';

const filePath = path.join(process.cwd(), 'src/app/data', 'theatre2.json');

export async function POST(req) {
    try {
        const { id, name, phone, email, eventType } = await req.json();

        // Check if eventType is provided and valid (either 'event1' or 'event2')
        if (!eventType || (eventType !== 'event1' && eventType !== 'event2')) {
            return new Response(JSON.stringify({ error: 'Invalid event type' }), { status: 400 });
        }

        // Read the existing booking data
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        // Find the seat by ID and update its booking details for the specified event
        const seatIndex = data.findIndex(seat => seat.id === id);
        if (seatIndex !== -1) {
            // Update the selected event's booking details dynamically
            data[seatIndex][eventType] = {
                ...data[seatIndex][eventType],
                booked: true,
                name,
                phone,
                email
            };

            // Write the updated data back to the file
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            return new Response(JSON.stringify({ message: 'Seat successfully booked' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Seat not found' }), { status: 400 });
        }
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to process the request' }), { status: 500 });
    }
}
