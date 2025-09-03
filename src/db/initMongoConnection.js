// src/db/initMongoConnection.js
// універсальний варіант initMongoConnection.js, який спочатку пробує взяти
// готовий MONGODB_URI, а якщо його немає — збирає рядок з окремих змінних (MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB):
import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    // 1. Якщо є повний URI у .env → беремо його
    let mongoUri = process.env.MONGODB_URI;

    // 2. Якщо немає — збираємо з частин
    if (!mongoUri) {
      const user = env('MONGODB_USER');
      const pass = env('MONGODB_PASSWORD');
      const host = env('MONGODB_URL');
      const db = env('MONGODB_DB');

      mongoUri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;
    }

    // 3. Підключення до Mongo
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Error while setting up mongo connection!', error);
    process.exit(1);
  }
};

// import mongoose from 'mongoose';

// import { env } from '../utils/env.js';

// export const initMongoConnection = async () => {
//     try {
//         const user = env('MONGODB_USER');
//         const pwd = env('MONGODB_PASSWORD');
//         const url = env('MONGODB_URL');
//         const db = env('MONGODB_DB');

//         await mongoose.connect(
//             `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
//         );
//         console.log('Mongo connect successfully established!');

//     } catch (e) {
//         console.log('Error while setting up mongo connection!', e);
//         throw e;

//     }
// };
