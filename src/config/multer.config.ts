import multer from "multer";
import path from "path";

const upload = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname+"/../../"+"/public/uploads"));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        const imageExtension = ["image/png", "image/jpg", "image/jpeg"].find(
            formatosAceitos => formatosAceitos == file.mimetype
        );

        if(imageExtension) {
            return cb(null, true);
        }

        return cb(null, false);
    }
}));

export default upload;
