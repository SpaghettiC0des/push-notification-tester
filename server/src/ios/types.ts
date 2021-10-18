import type { Request, Response } from 'express';
import type { Notification } from 'apn';

export type IOSRequest = Request<unknown, unknown, {
    appBundleId: string;
    teamId: string;
    keyId: string;
    deviceToken: string;
    production?: boolean;
    notification: Partial<Notification>;
}>;

export type IOSIncomingRequest = Omit<IOSRequest, 'notification'> & {notification: string};

export type IOSResponse = Response<any, Record<string, any>>;
