import express from 'express';
import { initAndroidEndpoints } from './android';
import { initIosEndpoints } from './ios';

const PORT = 3579;
const app = express();

app.use('/ios', initIosEndpoints());
app.use('/android', initAndroidEndpoints());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Push notification tester server: http://localhost:${PORT}`));
