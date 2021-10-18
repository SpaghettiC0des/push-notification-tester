import express from 'express';
import multer from 'multer';
import apn from 'apn';
import { kbToBytes } from '../utils';
import { IOSIncomingRequest, IOSRequest, IOSResponse } from './types';

function parseNotification(req: IOSIncomingRequest, _res: unknown, next: any) {
  if (req.body) {
    const { notification } = req.body;
    if (typeof notification === 'string') {
      req.body.notification = JSON.parse(notification || '{}');
    }
  }

  next();
}

export function initIosEndpoints() {
  const router = express.Router();
  const uploads = multer({
    limits: {
      fileSize: kbToBytes(10),
    },
    storage: multer.diskStorage({
      destination: './uploads/',
      filename(_req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

  router.use(parseNotification);

  router.post('/', [uploads.single('key'), parseNotification], async (req: IOSRequest, res: IOSResponse) => {
    try {
      if (!req.file) {
        throw new Error('`key` is required!');
      }

      const {
        teamId, keyId, deviceToken, notification, appBundleId, production = false,
      } = req.body;

      const apnProvider = new apn.Provider({
        token: {
          key: req.file.path,
          keyId,
          teamId,
        },
        production,
      });

      const apnNotification = new apn.Notification({ ...notification, topic: appBundleId });
      const response = await apnProvider.send(apnNotification, deviceToken);

      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
}
