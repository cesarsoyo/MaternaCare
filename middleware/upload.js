// On utilise une bibliothèque pour gérer les fichiers
const multer = require("multer");

// Voici les types de fichiers qu'on peut accepter
const mimeType = [
    'application/pdf', // PDF
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/msword', // DOC
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    'application/vnd.ms-excel', // XLS
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
    'application/vnd.ms-powerpoint', // PPT
    'image/jpeg', // JPEG
    'image/jpg', // JPG
    'image/png', // PNG
    'text/plain', // TXT
    'application/dicom', // DICOM
    'application/hl7-v2' // HL7
];

// On prépare un endroit pour stocker les fichiers
const storage = multer.diskStorage({
    // On choisit où mettre les fichiers
    destination: function (req, file, cb) {
        // On dit où sauvegarder
        cb(null, './public/assets/media/uploads');
    },
    // On crée un nom unique pour chaque fichier
    filename: function (req, file, cb) {
        // On prend le type du fichier
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1]; // C'est la fin du type, comme .jpg ou .pdf
        // On fait un nom unique avec le temps et un nombre aléatoire
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        // On assemble le nom final
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension);
    }
});

// On prépare l'upload avec des règles
const upload = multer({
    storage: storage,
    // On filtre les fichiers pour vérifier les types
    fileFilter: function (req, file, cb) {
        // Si le type n'est pas dans notre liste
        if (!mimeType.includes(file.mimetype)) {
            req.multerError = true; // On dit qu'il y a une erreur
            return cb(null, false); // On refuse le fichier
        }
        cb(null, true); // On accepte le fichier
    }
});

// On exporte la fonction upload pour l'utiliser ailleurs
module.exports = upload;
