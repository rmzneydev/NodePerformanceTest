// app/src/utils/multer.ts

import multer from "multer";
import { BadRequestError } from "../error/AppError";

/**
 * MIME types accepted for JSON seed files.
 */
const JSON_MIME_TYPES = [
  "application/json",
  "text/plain",
  "application/octet-stream",
];

/**
 * Multer storage configuration for uploaded seed files.
 *
 * Files are stored in memory because they only need to be read once
 * to populate the database and do not need to be persisted on disk.
 */
const storage = multer.memoryStorage();

/**
 * Filters uploaded files to allow JSON files only.
 *
 * A file is accepted when its MIME type is included in the supported
 * JSON MIME types or when its original filename has a `.json` extension.
 *
 * @param _req - Express request object.
 * @param file - Uploaded file information provided by Multer.
 * @param cb - Callback used to accept or reject the uploaded file.
 * @throws {BadRequestError} If the uploaded file is not a JSON file.
 */
function jsonFileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void {
  const isJsonMime = JSON_MIME_TYPES.includes(file.mimetype);
  const isJsonExt = file.originalname.toLowerCase().endsWith(".json");

  if (isJsonMime || isJsonExt) {
    return cb(null, true);
  }

  return cb(new BadRequestError("Solo se permiten archivos en formato JSON"));
}

/**
 * Multer middleware configured to accept a single seed file.
 *
 * The uploaded file must use the `file` field name and cannot exceed
 * 5 MB in size.
 */
export const uploadSeedFile = multer({
  storage,
  fileFilter: jsonFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("file");
