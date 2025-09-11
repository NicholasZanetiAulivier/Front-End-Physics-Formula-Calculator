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
    <input type="number" step="0.0001" id="charge1" name="charge1"></input><br>
    <span>Charge 2: </span>
    <input type="number" step="0.0001" id="charge2" name="charge2"></input><br>
    <span>Distance: </span>
    <input type="number" step="0.0001" id="distance" name="distance"></input><br>

    <span>Potential Energy: </span>
    <input type="number" step="0.0001" id="energy" name="energy"></input>
`

let electrostaticTrioHTML = `
    <span>Charge 1: </span>
    <input type="number" step="0.0001" id="charge1" name="charge1"></input><br>
    <span>Charge 2: </span>
    <input type="number" step="0.0001" id="charge2" name="charge2"></input><br>
    <span>Charge 3: </span>
    <input type="number" step="0.0001" id="charge3" name="charge3"></input><br>
    
    <span>Distance 1-2: </span>
    <input type="number" step="0.0001" id="distance12" name="distance12"></input><br>
    <span>Distance 1-3: </span>
    <input type="number" step="0.0001" id="distance13" name="distance13"></input><br>
    <span>Distance 2-3: </span>
    <input type="number" step="0.0001" id="distance23" name="distance23"></input><br>

    <span>Potential Energy: </span>
    <span id="energy"></span>
`

export { electrostaticChargeTemplate, electrostaticHTML, EQVHTML, electrostaticDuoHTML, electrostaticTrioHTML };