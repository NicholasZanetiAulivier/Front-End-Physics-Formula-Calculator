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
    mass: NaN,
    velocity: NaN,
    gravity: NaN,
    height: NaN,

    kinetic: NaN,
    potential: NaN,

    mechanical: NaN,
}

let fields = ['mass', 'velocity', 'gravity', 'height', 'kinetic', 'potential', 'mechanical'];


function calculateResults(e) {
    e.preventDefault();

    fields.forEach((field) => {
        if (inputElements[field].value) value[field] = Number(inputElements[field].value);
        else value[field].value = NaN;
    });

    if (mass == 0) {
        alert("Mass can't be 0");
        return;
    }

    // Has ME
    if (value.mechanical) {
        // ME = KE + ?
        if (value.kinetic && !value.potential) {
            value.potential = value.mechanical - value.kinetic
            inputElements.potential.value = value.potential.toString();
        }
        //ME = ? + PE
        else if (!value.kinetic && value.potential) {
            value.kinetic = value.mechanical - value.potential;
            inputElements.kinetic.value = value.kinetic.toString();
        }
        //ME = KE + PE (Validate)
        else if (value.kinetic && value.potential) {
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
    if (value.kinetic) {
        //KE = 0.5 * m * ? ^2
        if (value.mass && !value.velocity) {
            value.velocity = Math.sqrt(value.kinetic * 2 / value.mass);
            inputElements.velocity.value = value.velocity.toString();
        }
        //KE = 0.5 * ? * v^2
        else if (!value.mass && value.velocity) {
            value.mass = value.kinetic * 2 / value.velocity / value.velocity;
            inputElements.mass.value = value.mass.toString();
        }
        //KE = 0.5 * m * v^2 (Replace)
        else if (value.mass && value.velocity) {
            value.kinetic = NaN;
            inputElements.kinetic.value = "";
        }
    }

    //Has PE
    if (value.potential) {
        //PE = m * ? * h
        if (value.mass && !value.gravity && value.height) {
            value.gravity = value.potential / value.mass / value.height;
            inputElements.gravity.value = value.gravity.toString();
        }
        //PE = ? * g * h
        else if (!value.mass && value.gravity && value.height) {
            value.mass = value.potential / value.gravity / value.height;
            inputElements.mass.value = value.mass.toString();
        }
        //PE = m * g * ?
        else if (value.mass && value.gravity && !value.height) {
            value.height = value.potential / value.gravity / value.mass;
            inputElements.height.value = value.height.toString();
        }
        //PE = m * g * h (Replace)
        else if (value.mass && value.gravity && value.height) {
            value.potential = NaN;
            inputElements.potential.value = "";
        }
    }

    //Recalculate
    if (value.mass) {
        if (value.velocity) {
            value.kinetic = value.mass * value.velocity * value.velocity / 2;
            inputElements.kinetic.value = value.kinetic.toString();
            console.log('Kinetic Energy calculated');
        }
        if (value.gravity && value.height) {
            value.potential = value.mass * value.gravity * value.height;
            inputElements.potential.value = value.potential.toString();
            console.log('Potential Energy calculated')
        }
    }

    if (value.kinetic && value.potential) {
        value.mechanical = value.kinetic + value.potential;
        inputElements.mechanical.value = value.mechanical.toString();
        console.log('Mechanical Energy calculated');
    }


}