// const mongoose = require('mongoose');
import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    clientId: { type: String, requirerd: true },
    businessId: { type: String, requirerd: true },
    date: { type: Date, requirerd: true },
    time: { type: Date, requirerd: true },
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
