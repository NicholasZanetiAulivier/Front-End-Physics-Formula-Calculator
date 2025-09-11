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

let electrostaticDuoHTML = `
    <span>Charge 1: </span>
    <input type="number" step="0.0001" id="charge1" name="charge1"></input>
    <span>Charge 2: </span>
    <input type="number" step="0.0001" id="charge2" name="charge2"></input>
    <span>Distance: </span>
    <input type="number" step="0.0001" id="distance" name="distance"></input>

    <span>Potential Energy: </span>
    <input type="number" step="0.0001" id="energy" name="energy"></input>
`

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
        case 'electroDuo': {
            div.innerHTML = electrostaticDuoHTML;
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
        case 'electroDuo': {
            let html = {
                q1: document.getElementById('charge1'),
                q2: document.getElementById('charge2'),
                r: document.getElementById('distance'),
                E: document.getElementById('energy')
            };

            calculateDuo(html);
            break;
        }

    }
}

function calculateEQV(table) {
    let values = {};
    for (const k in table) {
        v = table[k];
        values[k] = null;
        if (Number(v.value) || v.value == "0") values[k] = new Number(v.value);
    }

    //E = QV
    if (values.E instanceof Number) {
        let hasQ = values.Q instanceof Number;
        let hasV = values.V instanceof Number;
        //E = ?V
        if (!hasQ && hasV) {
            values.Q = new Number(values.E / values.V);
            table.Q.value = values.Q;
        }
        //E = Q?
        else if (hasQ && !hasV) {
            values.V = new Number(values.E / values.Q);
            table.V.value = values.V;
        }
        //E = QV (replace)
        else if (hasQ && hasV) {
            values.E = NaN;
        }
    }

    //Q = It
    if (values.Q instanceof Number) {
        let hasI = values.I instanceof Number;
        let hasT = values.t instanceof Number;
        //Q = I?
        if (hasI && !hasT) {
            values.t = new Number(values.Q / values.I);
            table.t.value = values.t;
        }
        //Q = ?t
        else if (!hasI && hasT) {
            values.I = new Number(values.Q / values.t);
            table.I.value = values.I;
        }
        //Q = It (Replace)
        else if (hasI && hasT) {
            values.Q = NaN;
            table.Q.value = "";
        }
    }

    //V = IR
    if (values.V instanceof Number) {
        let hasI = values.I instanceof Number;
        let hasR = values.R instanceof Number;
        //V = I?
        if (hasI && !hasR) {
            console.log('calc R');
            values.R = new Number(values.V / values.I);
            console.log(values.V, values.I, values.R);
            table.R.value = values.R;
        }
        //V = ?R
        else if (!hasI && values.R) {
            values.I = new Number(values.V / values.R);
            table.I.value = values.I;
        }
        //V = IR (Replace)
        else if (hasI && hasR) {
            values.V = NaN;
            table.V.value = "";
        }

    }


    if (values.I instanceof Number) {
        if (values.t instanceof Number) {
            values.Q = new Number(values.I * values.t);
            table.Q.value = values.Q;
            console.log('Charge Calculated');
        }
        if (values.R instanceof Number) {
            values.V = new Number(values.I * values.R);
            table.V.value = values.V;
            console.log('Voltage Calculated');
        }
    }

    if (values.V instanceof Number && values.Q instanceof Number) {
        values.E = new Number(values.V * values.Q);
        table.E.value = values.E;
        console.log('Energy Calculated');
    }
    console.log(values);
}

function calculateStatic(table) {
    let shouldContinue = true;
    let subTotal = 0;
    for (let i = 0; i < table.otherCharges.length; i++) {
        if (!(table.otherCharges[i].value || table.otherDistance[i].value)) {
            shouldContinue = false;
            break;
        }
        subTotal += Number(table.otherCharges[i].value) / Number(table.otherDistance[i].value);
    }

    if (shouldContinue) {
        subTotal = subTotal * 8.98755 * table.q.value / 1000; // ke = Coulomb's Constant
        table.E.innerHTML = `${subTotal} J`;
    } else {
        alert('Fill in all of the blank values');
    }
}

function calculateDuo(table) {
    let values = {};
    for (const k in table) {
        v = table[k];
        values[k] = null;
        if (Number(v.value) || v.value == "0") values[k] = new Number(v.value);
        console.log(values);
    }

    if (values.E instanceof Number) {
        let hasQ1 = values.q1 instanceof Number;
        let hasQ2 = values.q2 instanceof Number;
        let hasR = values.r instanceof Number;
        if (hasQ1 && hasQ2 && !hasR) {
            values.r = values.q1 * values.q2 * 8.98755 / values.E / 1000;
            table.r.value = values.r;
        }
        else if (hasQ1 && !hasQ2 && hasR) {
            values.q2 = values.E * values.r * 1000 / 8.98755 / values.q1;
            table.q2.value = values.q2;
        }
        else if (!hasQ1 && hasQ2 && hasR) {
            values.q1 = values.E * values.r * 1000 / 8.98755 / values.q2;
            table.q1.value = values.q1;
        }
        else if (hasQ1 && hasQ2 && hasR) {
            values.E = null;
            table.E.value = "";
        }
    }

    if (values.q1 instanceof Number && values.q2 instanceof Number && values.r instanceof Number) {
        values.E = new Number(values.q1 * values.q2 / values.r * 8.98755 / 1000);
        table.E.value = values.E;
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