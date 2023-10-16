import auth from "./auth.mjs";
import downloads from "./downloads.mjs";
import health from "./health.mjs";

export const router = {
  authRouter: auth,
  health: health,
  downloads: downloads,
};

