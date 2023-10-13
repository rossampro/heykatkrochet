/**
 * @typedef {Object} Plushie
 * @param {number} id
 * @param {string} name
 * @param {string} path
 * @param {string} description
 * @param {string} templateCredit
*/
export class PlushieImage {
    constructor(id, name, path, description, templateCredit) {
        this.id = id
        this.name = name
        this.path = path
        this.description = description
        this.templateCredit = templateCredit
    }
}

const plushies = [
    new PlushieImage(
        1,
        'Bees',
        'threebees.jpg',
        'Cuddly bees of all shapes and sizes',
        'Beeweniqueboutique'),
    new PlushieImage(
        2,
        'Cats',
        'twocats.jpg',
        'Custom Kitties to cuddle',
        'Aqcrochets'),
    new PlushieImage(
        3,
        'Dinosaurs',
        'blackandpurpledinos.jpg',
        'Cute Dinosaurs for little ones',
        'MerryMakes'),
    new PlushieImage(
        4,
        'Lizard',
        'bluelizard.jpg',
        'An adorable lizard perfect for any reptile lover',
        'KawaiicuddlebugJulie'),
    new PlushieImage(
        5,
        'Alligator',
        'greyalligator.jpg',
        'A perfect rendition of one of our prehistoric friends',
        'NatsCrochetCreations'),
    new PlushieImage(
        6,
        'Turtle',
        'greenandwhiteturtle.jpg',
        'Surfs up with this adorable turtle',
        'CJ design'),
];

export default plushies;
