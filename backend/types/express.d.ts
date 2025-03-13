// types/express.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;  // Custom property for id
      role?: string; // Custom property for role
    }
  }
}

export { Request };

