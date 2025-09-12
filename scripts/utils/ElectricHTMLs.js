let EQVHTML = `
    <label for="ampere">Current: </label>
    <input type="number" step="0.0001" id="ampere" name="ampere"></input><span>A</span>
    <label for="currentDuration">Current Duration: </label>
    <input type="number" step="0.0001" id="currentDuration" name="currentDuration"></input><span>s</span>
    <label for="resistance">Resistance: </label>
    <input type="number" step="0.0001" id="resistance" name="resistance"></input><span>ohm</span>
    
    <label for="volts">Voltage: </label>
    <input type="number" step="0.0001" id="volts" name="volts"></input><span>V</span>
    <label for="charge">Electric Charge: </label>
    <input type="number" step="0.0001" id="charge" name="charge"></input><span>C</span>

    <label for="energy">Energy Transfer: </label>
    <input type="number" step="0.0001" id="energy" name="energy"></input><span>J</span>
    `;

let electrostaticHTML = `
    <label for="selfCharge">Primary Charge: </label>
    <input type="number" step="0.0001" id="selfCharge" name="selfCharge"></input>&#181;C

    <div class="q">
        <span>Additional Charge:</span>
        <span>Charge: </span>
        <input type="number" step="0.0001" class="charge" name="charge"></input>&#181;C
        <span>Distance: </span> 
        <input type="number" step="0.0001" class="distance" name="distance"></input>
        <button type="button" class="addCharge">Add</button>
        <button type="button" class="deleteCharge">Delete</button>
    </div>
    <span>Electrostatic Potential Energy of Primary Charge: </span>
    <span id="energy"></span>
`;

let electrostaticChargeTemplate = `
        <span>Charge: </span>
        <input type="number" step="0.0001" class="charge" name="charge"></input>&#181;C
        <span>Distance: </span> 
        <input type="number" step="0.0001" class="distance" name="distance"></input>
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

let electrostaticTrioHTML = `
    <span>Charge 1: </span>
    <input type="number" step="0.0001" id="charge1" name="charge1"></input>
    <span>Charge 2: </span>
    <input type="number" step="0.0001" id="charge2" name="charge2"></input>
    <span>Charge 3: </span>
    <input type="number" step="0.0001" id="charge3" name="charge3"></input>
    
    <span>Distance 1-2: </span>
    <input type="number" step="0.0001" id="distance12" name="distance12"></input>
    <span>Distance 1-3: </span>
    <input type="number" step="0.0001" id="distance13" name="distance13"></input>
    <span>Distance 2-3: </span>
    <input type="number" step="0.0001" id="distance23" name="distance23"></input>

    <span>Potential Energy: </span>
    <span id="energy"></span>
`

export { electrostaticChargeTemplate, electrostaticHTML, EQVHTML, electrostaticDuoHTML, electrostaticTrioHTML };