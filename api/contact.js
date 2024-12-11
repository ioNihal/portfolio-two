import { Contact } from "src/lib/models"
import { connectToDB } from "src/lib/utils"

export default async function handler(req, res) {
    res.send("Hi")
    console.log(req)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    console.log(req)
    try {
        await connectToDB();
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({ message: 'Message submitted successfully!' });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred: ' + error.message });
    }
}
