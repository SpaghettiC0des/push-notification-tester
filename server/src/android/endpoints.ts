import express from 'express';

export function initAndroidEndpoints() {
  const router = express.Router({ mergeParams: true });

  router.post('/', (_req, res) => {
    res.send('android');
  });

  return router;
}
