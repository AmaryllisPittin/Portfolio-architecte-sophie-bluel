const multer = require('multer')

const MIME_TYPE = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
}

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './images')
	},
	filename:  (req, file, callback) => {
		const filename = file.originalname.split(' ').join('_')
		const filenameArray = filename.split('.')
		filenameArray.pop()
		const filenameWithoutExtention = filenameArray.join('.')
			const extension = MIME_TYPE[file.mimetype]
		callback(null, filenameWithoutExtention + Date.now() + '.' + extension)
	}
})

module.exports = multer({storage}).single('image')

const clientId = '1';
const projectsURL = "http://localhost:5678/api/users/login";

console.log("avant le fetch");
fetch(projectsURL)
.then(response => {
	if(!response.ok) {
		throw new Error('Erreur de réseau lors de la récupération des projets');
	}
	response.json();
})
.then(projects => {
	console.log('Projets du client:', projects);
})
.catch(error => {
	console.error('Erreur lors de la récupération finale des projets:', error);
});
