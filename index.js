const http = require('http');

const {
  getAllAnimals,
  getSingleAnimal,
  createNewAnimal,
  updateAnimal,
  deleteAnimal
} = require('./src/controllers.js');

const server = http.createServer((req, res) => {
  const baseURL = 'http://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);

  const { method } = req;

  const pathname = reqUrl.pathname;

  const matches = pathname.match(/\/animal\/([\w-]+)\/?/);
  const animalId = matches ? matches[1] : null;

  const routeNotFound = () =>
    res.end(JSON.stringify({ message: 'Route not found!' }));

  if (method === 'GET') {
    if (pathname === '/animal') {
      getAllAnimals(req, res);
    } else if (animalId) {
      getSingleAnimal(req, res, animalId);
    } else {
      routeNotFound();
    }
  } else if (method === 'POST') {
    if (pathname === '/animal') {
      createNewAnimal(req, res);
    } else {
      routeNotFound();
    }
  } else if (method === 'PUT') {
    if (animalId) {
      updateAnimal(req, res, animalId);
    } else {
      routeNotFound();
    }
  } else if (method === 'DELETE') {
    if (animalId) {
      deleteAnimal(req, res, animalId);
    } else {
      routeNotFound();
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
