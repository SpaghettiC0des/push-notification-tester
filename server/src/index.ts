import express from 'express';

const PORT = 3579;
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.listen(PORT, () => console.log(`Push notification tester server: http://localhost:${PORT}`));
