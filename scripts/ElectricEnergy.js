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