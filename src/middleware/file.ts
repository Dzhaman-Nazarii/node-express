import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "src/images");
	},
	filename(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + '-' + file.originalname.replace(/:/g, '-'));
	},
});

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const fileMiddleware = multer({
	storage,
	fileFilter,
});

export { fileMiddleware };
