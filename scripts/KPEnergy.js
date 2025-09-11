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

let value = {
    mass: null,
    velocity: null,
    gravity: null,
    height: null,

    kinetic: null,
    potential: null,

    mechanical: null,
}

let fields = ['mass', 'velocity', 'gravity', 'height', 'kinetic', 'potential', 'mechanical'];


function calculateResults(e) {
    e.preventDefault();

    fields.forEach((field) => {
        value[field] = null;
        if (Number(inputElements[field].value) || inputElements[field].value == "0") value[field] = new Number(inputElements[field].value);
    });

    console.log(value);

    if (mass == 0) {
        alert("Mass can't be 0");
        return;
    }

    // Has ME
    if (value.mechanical instanceof Number) {
        let hasKinetic = value.kinetic instanceof Number;
        let hasPotential = value.potential instanceof Number;

        // ME = KE + ?
        if (hasKinetic && !hasPotential) {
            value.potential = new Number(value.mechanical - value.kinetic);
            inputElements.potential.value = value.potential;
        }
        //ME = ? + PE
        else if (!hasKinetic && hasPotential) {
            value.kinetic = new Number(value.mechanical - value.potential);
            inputElements.kinetic.value = value.kinetic;
        }
        //ME = KE + PE (Validate)
        else if (hasPotential && hasPotential) {
            let tempMechanical = value.kinetic + value.potential;
            if (tempMechanical != value.mechanical) {
                alert('The values for Kinetic, Potential, and Mechanical energy does not make sense');
                console.log(tempMechanical);
                console.log(value.mechanical);
                return;
            }
        }
    }

    //Has KE
    if (value.kinetic instanceof Number) {
        let hasMass = value.mass instanceof Number;
        let hasVelocity = value.velocity instanceof Number;
        //KE = 0.5 * m * ? ^2
        if (hasMass && !hasVelocity) {
            value.velocity = new Number(Math.sqrt(value.kinetic * 2 / value.mass));
            inputElements.velocity.value = value.velocity;
        }
        //KE = 0.5 * ? * v^2
        else if (!hasMass && hasVelocity) {
            value.mass = new Number(value.kinetic * 2 / value.velocity / value.velocity);
            inputElements.mass.value = value.mass;
        }
        //KE = 0.5 * m * v^2 (Replace)
        else if (hasMass && hasVelocity) {
            value.kinetic = null;
            inputElements.kinetic.value = "";
        }
    }

    //Has PE
    if (value.potential instanceof Number) {
        let hasGravity = value.gravity instanceof Number;
        let hasMass = value.mass instanceof Number;
        let hasHeight = value.height instanceof Number;
        //PE = m * ? * h
        if (hasMass && !hasGravity && hasHeight) {
            value.gravity = new Number(value.potential / value.mass / value.height);
            inputElements.gravity.value = value.gravity;
        }
        //PE = ? * g * h
        else if (!hasMass && hasGravity && hasHeight) {
            value.mass = new Number(value.potential / value.gravity / value.height);
            inputElements.mass.value = value.mass;
        }
        //PE = m * g * ?
        else if (hasMass && hasGravity && !hasHeight) {
            value.height = new Number(value.potential / value.gravity / value.mass);
            inputElements.height.value = value.height;
        }
        //PE = m * g * h (Replace)
        else if (hasMass && hasGravity && hasHeight) {
            value.potential = null;
            inputElements.potential.value = "";
        }
    }

    //Recalculate
    if (value.mass instanceof Number) {
        if (value.velocity instanceof Number) {
            value.kinetic = new Number(value.mass * value.velocity * value.velocity / 2);
            inputElements.kinetic.value = value.kinetic;
            console.log('Kinetic Energy calculated');
        }
        if (value.gravity instanceof Number && value.height instanceof Number) {
            value.potential = new Number(value.mass * value.gravity * value.height);
            inputElements.potential.value = value.potential;
            console.log('Potential Energy calculated')
        }
    }

    if (value.kinetic instanceof Number && value.potential instanceof Number) {
        value.mechanical = new Number(value.kinetic + value.potential);
        inputElements.mechanical.value = value.mechanical;
        console.log('Mechanical Energy calculated');
    }

}