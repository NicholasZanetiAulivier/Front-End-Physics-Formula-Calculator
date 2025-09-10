let EQVHTML = `
    <span>Current: </span>
    <input type="number" step="0.0001" id="ampere" name="ampere"></input><br>
    <span>Current Duration: </span>
    <input type="number" step="0.0001" id="currentDuration" name="currentDuration"></input><br>
    <span>Resistance: </span>
    <input type="number" step="0.0001" id="resistance" name="resistance"></input><br>
    
    <span>Voltage: </span>
    <input type="number" step="0.0001" id="volts" name="volts"></input><br>
    <span>Electric Charge: </span>
    <input type="number" step="0.0001" id="charge" name="charge"></input><br>

    <span>Energy Transfer: </span>
    <input type="number" step="0.0001" id="energy" name="energy"></input>
    `;

let electrostaticHTML = `
    <span>Primary Charge: </span>
    <input type="number" step="0.0001" id="selfCharge" name="selfCharge"></input>&#181;C<br>

    <div class="q">
        <span>Additional Charge:</span><br>
        <span>Charge: </span>
        <input type="number" step="0.0001" class="charge" name="charge"></input>&#181;C<br>
        <span>Distance: </span> 
        <input type="number" step="0.0001" class="distance" name="distance"></input><br>
        <button type="button" class="addCharge">Add</button>
        <button type="button" class="deleteCharge">Delete</button>
    </div>
    <span>Electrostatic Potential Energy of Primary Charge: </span>
    <span id="energy"></span>
`;

let electrostaticChargeTemplate = `
        <span>Charge: </span>
        <input type="number" step="0.0001" class="charge" name="charge"></input>&#181;C<br>
        <span>Distance: </span> 
        <input type="number" step="0.0001" class="distance" name="distance"></input><br>
        <button type="button" class="addCharge">Add</button>
        <button type="button" class="deleteCharge">Delete</button>
`;

let form = document.getElementById('inputForm');
let select = document.getElementById('subtype');
let div = document.getElementById('currentContext');

form.children[1].addEventListener('change', changeContents);
form.addEventListener('submit', calculateContents);

changeContents(null);
function changeContents(e) {
    switch (select.value) {
        case 'EQV': {
            div.innerHTML = EQVHTML;
            break;
        }
        case 'electrostatic': {
            div.innerHTML = electrostaticHTML;
            bindAddButtons();
            bindDeleteButtons();
            break;
        }
    }
}

function calculateContents(e) {
    e.preventDefault();

    switch (select.value) {
        case 'EQV': {
            let html = {
                I: document.getElementById('ampere'),
                t: document.getElementById('currentDuration'),
                R: document.getElementById('resistance'),
                V: document.getElementById('volts'),
                Q: document.getElementById('charge'),
                E: document.getElementById('energy')
            };

            calculateEQV(html);
            break;
        }
        case 'electrostatic': {
            let html = {
                q: document.getElementById('selfCharge'),
                otherCharges: document.getElementsByClassName('charge'),
                otherDistance: document.getElementsByClassName('distance'),
                E: document.getElementById('energy'),
            };

            calculateStatic(html);
            break;
        }
    }
}

function calculateEQV(table) {
    let values = {
        I: Number(table.I.value),
        t: Number(table.t.value),
        R: Number(table.R.value),
        V: Number(table.V.value),
        Q: Number(table.Q.value),
        E: Number(table.E.value),
    }

    //E = QV
    if (values.E) {
        //E = ?V
        if (!values.Q && values.V) {
            values.Q = values.E / values.V;
            table.Q.value = values.Q;
        }
        //E = Q?
        else if (values.Q && !values.V) {
            values.V = values.E / values.Q;
            table.V.value = values.V;
        }
        //E = QV (Double Check)
        else if (values.Q && values.V) {
            let tempEnergy = values.Q * values.V;
            if (tempEnergy != values.E) {
                alert('Values for Voltage, Charge, and Energy do not add up');
                console.log(tempEnergy);
                console.log(value.E);
            }
        }
    }

    //Q = It
    if (values.Q) {
        //Q = I?
        if (values.I && !values.t) {
            values.t = values.Q / values.I;
            table.t.value = values.t;
        }
        //Q = ?t
        else if (!values.I && values.t) {
            values.I = values.Q / values.t;
            table.I.value = values.I;
        }
        //Q = It (Replace)
        else if (values.I && values.t) {
            values.Q = NaN;
            table.Q.value = "";
        }
    }

    //V = IR
    if (values.V) {
        //V = I?
        if (values.I && !values.R) {
            console.log('calc R');
            values.R = values.V / values.I;
            console.log(values.V, values.I, values.R);
            table.R.value = values.R;
        }
        //V = ?R
        else if (!values.I && values.R) {
            values.I = values.V / values.R;
            table.I.value = values.I;
        }
        //V = IR (Replace)
        else if (values.I && values.R) {
            values.V = NaN;
            table.V.value = "";
        }

    }


    if (values.I) {
        if (values.t) {
            values.Q = values.I * values.t;
            table.Q.value = values.Q;
            console.log('Charge Calculated');
        }
        if (values.R) {
            values.V = values.I * values.R;
            table.V.value = values.V;
            console.log('Voltage Calculated');
        }
    }

    if (values.V && values.Q) {
        values.E = values.V * values.Q;
        table.E.value = values.E;
        console.log('Energy Calculated');
    }
}

function calculateStatic(table) {
    let shouldContinue = true;
    let subTotal = 0;
    for (let i = 0; i < table.otherCharges.length; i++) {
        if (!table.otherCharges[i].value) {
            shouldContinue = false;
            break;
        }
        subTotal += table.otherCharges[i].value / table.otherDistance[i].value;
    }

    if (shouldContinue) {
        subTotal = subTotal * 8.98755 * table.q.value / 1000; // ke = Coulomb's Constant
        table.E.innerHTML = `${subTotal} J`;
    } else {
        alert('Fill in all of the blank values');
    }
}

function bindAddButtons() {
    let addButtons = document.getElementsByClassName('addCharge');
    for (let i = 0; i < addButtons.length; i++) {
        let b = addButtons[i];
        console.log(b);
        b.onclick = addCharge; // event listener
    }
}

function bindDeleteButtons() {
    let deleteButtons = document.getElementsByClassName('deleteCharge');
    for (let i = 0; i < deleteButtons.length; i++) {
        let b = deleteButtons[i];
        console.log(b);
        b.onclick = deleteCharge; // event listener
    }
}

function addCharge(e) {
    let newCharge = document.createElement('div');
    newCharge.innerHTML = electrostaticChargeTemplate;
    newCharge.className = 'q';
    e.target.parentElement.after(newCharge);
    let children = newCharge.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].className == 'addCharge') {
            children[i].onclick = addCharge;
        } else if (children[i].className == 'deleteCharge') {
            children[i].onclick = deleteCharge;
        }
    }
}

function deleteCharge(e) {
    let charges = document.getElementsByClassName('q');
    if (charges.length > 1) {
        let target = e.target;
        let parent = target.parentElement;
        let parentsParent = parent.parentElement;
        parentsParent.removeChild(parent);
    }
}