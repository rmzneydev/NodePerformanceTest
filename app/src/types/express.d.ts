// app/src/types/express.d.ts
import { JwtPayload } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
