let EQVHTML = `
    <label for="ampere">Current: </label>
    <input type="number" step="0.0001" id="ampere" name="ampere"></input><br>
    <label for="currentDuration">Current Duration: </label>
    <input type="number" step="0.0001" id="currentDuration" name="currentDuration"></input><br>
    <label for="resistance">Resistance: </label>
    <input type="number" step="0.0001" id="resistance" name="resistance"></input><br>
    
    <label for="volts">Voltage: </label>
    <input type="number" step="0.0001" id="volts" name="volts"></input><br>
    <label for="charge">Electric Charge: </label>
    <input type="number" step="0.0001" id="charge" name="charge"></input><br>

    <label for="energy">Energy Transfer: </label>
    <input type="number" step="0.0001" id="energy" name="energy"></input>
    `;
let electrostaticHTML = `
    <label for="selfCharge">Charge: </label>
    <input type="number" step="0.0001" id="selfCharge" name="selfCharge"></input><br>

    <div class="q">
        <span>Additional Charge:</span><br>
        <label for="charge">Charge: </label>
        <input type="number" step="0.0001" id="charge" name="charge"></input><br>
        <label for="distance">Distance: </label> 
        <input type="number" step="0.0001" id="distance" name="distance"></input><br>
        <button type="button" class="addCharge">Add</button>
        <button type="button" class="deleteCharge">Delete</button>
    </div>
`;

let electrostaticChargeTemplate = `
    <div class="q">
        <label for="charge">Charge: </label>
        <input type="number" step="0.0001" id="charge" name="charge"></input><br>
        <label for="distance">Distance: </label> 
        <input type="number" step="0.0001" id="distance" name="distance"></input><br>
        <button type="button" class="addCharge">Add</button>
        <button type="button" class="deleteCharge">Delete</button>
    </div>
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
            break;
        }
    }
}

function calculateContents(e) {
    e.preventDefault();
}

function bindAddButtons() {
    let addButtons = document.getElementsByClassName('addCharge');
    for (let i = 0; i < addButtons.length; i++) {
        let b = addButtons[i];
        console.log(b);
        b.onclick = addCharge; // event listener
    }
}

function addCharge() {
    let newCharge = document.createElement('div');
    newCharge.innerHTML = electrostaticChargeTemplate;
    div.appendChild(newCharge);
    bindAddButtons();
}