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
        '@/assets/images/threebees.jpg',
        'Cuddly bees of all shapes and sizes',
        'Beeweniqueboutique'),
    new PlushieImage(
        2,
        'Cats',
        '@/assets/images/twocats.jpg',
        'Custom Kitties to cuddle',
        'Aqcrochets'),
    new PlushieImage(
        3,
        'Dinosaurs',
        '@/assets/images/blackandpurpledinos.jpg',
        'Cute Dinosaurs for little ones',
        'MerryMakes'),
    new PlushieImage(
        4,
        'Lizard',
        '@/assets/images/bluelizard.jpg',
        'An adorable lizard perfect for any reptile lover',
        'KawaiicuddlebugJulie'),
    new PlushieImage(
        5,
        'Alligator',
        '@/assets/images/greyalligator.jpg',
        'A perfect rendition of one of our prehistoric friends',
        'NatsCrochetCreations'),
    new PlushieImage(
        6,
        'Turtle',
        '@/assets/images/greenandwhiteturtle.jpg',
        'Surfs up with this adorable turtle',
        'CJ design'),
];

export default plushies;
