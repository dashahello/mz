const Animal = require('./model.js');
const { getPostData } = require('./utils.js');

const contentType = { 'Content-Type': 'aplication/json' };

async function getAllAnimals(req, res) {
  try {
    const animals = await Animal.findAll();

    res.writeHead(200, contentType);
    res.end(JSON.stringify(animals));
  } catch (error) {
    console.log(error);
  }
}

async function getSingleAnimal(req, res, id) {
  try {
    const animal = await Animal.findById(id);

    if (!animal) {
      res.writeHead(404, contentType);
      res.end(
        JSON.stringify({ message: `Animal with an id ${id} not found!` })
      );
    } else {
      res.writeHead(200, contentType);
      res.end(JSON.stringify(animal));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createNewAnimal(req, res) {
  try {
    const body = await getPostData(req);

    const { species, name, age, health } = JSON.parse(body);

    const animal = {
      species,
      name,
      age,
      health
    };

    const newAnimal = await Animal.create(animal);

    res.writeHead(201, contentType);

    return res.end(JSON.stringify(newAnimal));
  } catch (error) {
    console.log(error);
  }
}

async function updateAnimal(req, res, id) {
  try {
    const animal = await Animal.findById(id);

    if (!animal) {
      res.writeHead(404, contentType);
      res.end(
        JSON.stringify({ message: `Animal with an id ${id} not found!` })
      );
    } else {
      const body = await getPostData(req);

      const { species, name, age, health } = JSON.parse(body);

      const animalData = {
        species: species || animal.species,
        name: name || animal.name,
        age: age || animal.age,
        health: health || animal.health
      };

      const updatedAnimal = await Animal.update(id, animalData);

      res.writeHead(200, contentType);
      res.end(JSON.stringify(updatedAnimal));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteAnimal(req, res, id) {
  try {
    const animal = await Animal.findById(id);

    if (!animal) {
      res.writeHead(404, contentType);
      res.end(
        JSON.stringify({ message: `Animal with an id ${id} not found!` })
      );
    } else {
      await Animal.remove(id);
      res.writeHead(200, contentType);
      res.end(
        JSON.stringify({
          message: `Animal with an id ${id} was successfully deleted!`
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  createNewAnimal,
  updateAnimal,
  deleteAnimal
};
