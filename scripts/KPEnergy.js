let inputForm = document.getElementById('inputForm');
inputForm.addEventListener('submit', calculateResults);

let inputElements = {
    mass: document.getElementById('mass'),
    velocity: document.getElementById('velocity'),
    gravity: document.getElementById('gravity'),
    height: document.getElementById('height'),

    kinetic: document.getElementById('kineticEnergy'),
    potential: document.getElementById('potentialEnergy'),

    mechanical: document.getElementById('mechanicalEnergy'),
}


function calculateResults(e) {
    e.preventDefault();
    alert('what');
    console.log(inputElements);
}