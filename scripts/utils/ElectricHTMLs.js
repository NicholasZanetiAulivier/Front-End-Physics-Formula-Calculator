let EQVHTML = `
    <div class="I">
        <label for="ampere"><b>Current</b> (A): </label>
        <input type="number" step="0.0001" id="ampere" name="ampere"></input>
    </div>
    <div class="t">
        <label for="currentDuration"><b>Current Duration</b> (s): </label>
        <input type="number" step="0.0001" id="currentDuration" name="currentDuration"></input>
    </div>
    <div class="R">
        <label for="resistance"><b>Resistance</b> (&#x2126;): </label>
        <input type="number" step="0.0001" id="resistance" name="resistance"></input>
    </div>

    <div class="V">
        <label for="volts"><b>Voltage</b> (V): </label>
        <input type="number" step="0.0001" id="volts" name="volts"></input>
    </div>
    <div class="Q">
        <label for="charge"><b>Electric Charge</b> (C): </label>
        <input type="number" step="0.0001" id="charge" name="charge"></input>
    </div>

    <div class="E">
        <label for="energy"><b>Energy Transfer</b> (J): </label>
        <input type="number" step="0.0001" id="energy" name="energy"></input>
    </div>
    `;

let electrostaticHTML = `
    <div class="q1">
    <label for="selfCharge"><b>Primary Charge</b> (&#181;C): </label>
    <input type="number" step="0.0001" id="selfCharge" name="selfCharge"></input>
    </div>

    <div class="q">
        <div class="qO">
            <span><b>Charge</b> (&#181;C): </span>
            <input type="number" step="0.0001" class="charge" name="charge"></input>
        </div>
        <div class="rO">
            <span><b>Distance</b> (m): </span>
            <input type="number" step="0.0001" class="distance" name="distance"></input>
        </div>
        <div>
            <button type="button" class="addCharge">+</button>
            <button type="button" class="deleteCharge">-</button>
        </div>
    </div>

    <div class="E">
    <span><b>Electrostatic Energy</b> (J):</span>
    <input type="number" step="0.0001" id="energy" readonly></input>
    </div>
`;

let electrostaticChargeTemplate = `
        <div class="qO">
            <span><b>Charge</b> (&#181;C): </span>
            <input type="number" step="0.0001" class="charge" name="charge"></input>
        </div>
        <div class="rO">
            <span><b>Distance</b> (m): </span>
            <input type="number" step="0.0001" class="distance" name="distance"></input>
        </div>
        <div>
            <button type="button" class="addCharge">+</button>
            <button type="button" class="deleteCharge">-</button>
        </div>
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