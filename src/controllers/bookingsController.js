import { Booking } from '../db/models/booking.js';
// Створити нове бронювання
export const createBooking = async (req, res) => {
  try {
    const { businessId, date, time } = req.body;
    const clientId = req.user.id; // беремо з auth middleware

    const newBooking = await Booking.create({
      clientId,
      businessId,
      date,
      time,
    });

    res.status(201).json({
      status: 201,
      message: 'Booking successfully created',
      data: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
};

// Отримати всі свої бронювання
export const getMyBookings = async (req, res) => {
  try {
    const clientId = req.user.id;

    const bookings = await Booking.find({ clientId }).sort({
      date: 1,
      time: 1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
};

// Видалити бронювання
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ status: 404, message: 'Booking not found' });
    if (booking.clientId.toString() !== req.user.id)
      return res.status(401).json({ status: 401, message: 'Unauthorized' });

    await booking.remove();

    res
      .status(200)
      .json({ status: 200, message: 'Booking successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
};

// Відмінити бронювання (змінити статус)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ status: 404, message: 'Booking not found' });
    if (booking.clientId.toString() !== req.user.id)
      return res.status(401).json({ status: 401, message: 'Unauthorized' });

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
};

// Оновити дані існуючого бронювання
export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id; // id з URL (/bookings/:id/update)
    const clientId = req.user.id; // id юзера з токена (auth middleware)
    const { businessId, date, time } = req.body; // дані, які можна оновити

    // Шукаємо бронювання і перевіряємо, чи воно належить цьому користувачу
    const booking = await Booking.findOne({ _id: bookingId, clientId });

    if (!booking) {
      return res.status(404).json({
        status: 404,
        message: 'Booking not found or you do not have permission',
      });
    }

    // Оновлюємо тільки ті поля, які передані у body
    if (businessId) booking.businessId = businessId;
    if (date) booking.date = date;
    if (time) booking.time = time;

    // Зберігаємо зміни
    const updatedBooking = await booking.save();

    res.status(200).json({
      status: 200,
      message: 'Booking successfully updated',
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Server error' });
  }
};
