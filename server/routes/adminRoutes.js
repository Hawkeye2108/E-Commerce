const { uploadBook } = require("../controllers/adminController");

const router = require("express").Router();
const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({}),
    limits:{fileSize:50000000},
    
}
);

router.post("/uploadbook", upload.single("image"), uploadBook);


module.exports = router;