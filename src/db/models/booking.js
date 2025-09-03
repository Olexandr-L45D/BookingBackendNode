// const mongoose = require('mongoose');
import { model, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    clientId: { type: String, requirerd: true },
    businessId: { type: String, requirerd: true },
    date: { type: String, requirerd: true },
    time: { type: String, requirerd: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);
export const Booking = model('booking', bookingSchema);
