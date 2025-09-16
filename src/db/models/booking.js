// const mongoose = require('mongoose');
import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    clientId: { type: String, required: true },
    businessId: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);
export const Booking = model('booking', bookingSchema);
