'use server';

import Booking from '@/database/booking.model';
import connectDB from "@/lib/mongodb";
import { Types } from 'mongoose';

export const createBooking = async ({ eventId, email }: { eventId: string; email: string; }) => {
    try {
        await connectDB();

        // Validate eventId is a valid MongoDB ObjectId string
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            return { success: false, error: `Invalid event ID format: "${eventId}"` };
        }

        // Convert eventId string to MongoDB ObjectId
        const objectId = new Types.ObjectId(eventId);

        await Booking.create({ eventId: objectId, email });

        return { success: true };
    } catch (e) {
        const errorMsg = e instanceof Error ? e.message : String(e);
        console.error('Booking creation failed:', errorMsg, 'eventId:', eventId);
        return { success: false, error: errorMsg };
    }
}
