const { v4: uuidv4 } = require('uuid');
let animals = require('../data.json');
const { writeDataToFile } = require('./utils.js');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(animals);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const animal = animals.find((animal) => animal.id === id);
    resolve(animal);
  });
}

function create(animal) {
  return new Promise((resolve, reject) => {
    const newAnimal = { id: uuidv4(), ...animal };
    animals.push(newAnimal);

    writeDataToFile('./data.json', animals);

    resolve(animals);
  });
}

function update(id, animal) {
  return new Promise((resolve, reject) => {
    const index = animals.findIndex((animal) => animal.id === id);
    animals[index] = { id, ...animal };

    writeDataToFile('./data.json', animals);

    resolve(animals[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    animals = animals.filter((animal) => animal.id !== id);

    writeDataToFile('./data.json', animals);

    resolve();
  });
}

module.exports = { findAll, findById, create, update, remove };
