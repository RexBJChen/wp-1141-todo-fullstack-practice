import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import path from 'path';

// ... (keep existing setup)

app.use(cors());
app.use(express.json());

// 使用 Router
app.use('/api/todos', todoRoutes);

// Serve static files from the React app
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
