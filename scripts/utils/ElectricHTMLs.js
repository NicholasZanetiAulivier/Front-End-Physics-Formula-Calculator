let EQVHTML = `
    <div class="I">
        <label for="ampere"><b>Current</b> (A): </label>
        <input type="number" step="0.0001" id="ampere" name="ampere" autocomplete="off"></input>
    </div>
    <div class="t">
        <label for="currentDuration"><b>Current Duration</b> (s): </label>
        <input type="number" step="0.0001" id="currentDuration" name="currentDuration" autocomplete="off"></input>
    </div>
    <div class="R">
        <label for="resistance"><b>Resistance</b> (&#x2126;): </label>
        <input type="number" step="0.0001" id="resistance" name="resistance" autocomplete="off"></input>
    </div>

    <div class="V">
        <label for="volts"><b>Voltage</b> (V): </label>
        <input type="number" step="0.0001" id="volts" name="volts" autocomplete="off"></input>
    </div>
    <div class="Q">
        <label for="charge"><b>Electric Charge</b> (C): </label>
        <input type="number" step="0.0001" id="charge" name="charge" autocomplete="off"></input>
    </div>

    <div class="E">
        <label for="energy"><b>Energy Transfer</b> (J): </label>
        <input type="number" step="0.0001" id="energy" name="energy" autocomplete="off"></input>
    </div>
    `;

let electrostaticHTML = `
    <div class="q1">
        <label for="selfCharge"><b>Primary Charge</b> (&#181;C): </label>
        <input type="number" step="0.0001" id="selfCharge" name="selfCharge" autocomplete="off"></input>
    </div>

    <div class="q">
        <div class="qO">
            <span><b>Charge</b> (&#181;C): </span>
            <input type="number" step="0.0001" class="charge" name="charge" autocomplete="off"></input>
        </div>
        <div class="rO">
            <span><b>Distance</b> (m): </span>
            <input type="number" step="0.0001" class="distance" name="distance" autocomplete="off"></input>
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
            <input type="number" step="0.0001" class="charge" name="charge" autocomplete="off"></input>
        </div>
        <div class="rO">
            <span><b>Distance</b> (m): </span>
            <input type="number" step="0.0001" class="distance" name="distance" autocomplete="off"></input>
        </div>
        <div>
            <button type="button" class="addCharge">+</button>
            <button type="button" class="deleteCharge">-</button>
        </div>
`;

let electrostaticDuoHTML = `
    <div class="q1">
        <span><b>Charge 1</b> (&#181;C): </span>
        <input type="number" step="0.0001" id="charge1" name="charge1" autocomplete="off"></input>
    </div>
    <div class="q2">
        <span><b>Charge 2</b> (&#181;C): </span>
        <input type="number" step="0.0001" id="charge2" name="charge2" autocomplete="off"></input>
    </div>
    <div class="r">
        <span><b>Distance</b> (m): </span>
        <input type="number" step="0.0001" id="distance" name="distance" autocomplete="off"></input>
    </div>

    <div class="E">
        <span><b>Potential Energy</b> (J): </span>
        <input type="number" step="0.0001" id="energy" name="energy" autocomplete="off"></input>
    </div>
`

let electrostaticTrioHTML = `
    <div class="q1">
        <span><b>Charge 1</b> (&#181;C): </span>
        <input type="number" step="0.0001" id="charge1" name="charge1" autocomplete="off"></input>
    </div>
    <div class="q2">
        <span><b>Charge 2</b> (&#181;C): </span>
        <input type="number" step="0.0001" id="charge2" name="charge2" autocomplete="off"></input>
    </div>
    <div class="q3">
        <span><b>Charge 3</b> (&#181;C): </span>
        <input type="number" step="0.0001" id="charge3" name="charge3" autocomplete="off"></input>
    </div>
    
    <div class="r12">
        <span><b>Distance 1-2</b> (m): </span>
        <input type="number" step="0.0001" id="distance12" name="distance12" autocomplete="off"></input>
    </div>
    <div class="r13">
        <span><b>Distance 1-3</b> (m): </span>
        <input type="number" step="0.0001" id="distance13" name="distance13" autocomplete="off"></input>
    </div>
    <div class="r23">
        <span><b>Distance 2-3</b> (m): </span>
        <input type="number" step="0.0001" id="distance23" name="distance23" autocomplete="off"></input>
    </div>

    <div class="E">
        <span><b>Potential Energy</b> (J): </span>
        <input type="number" step="0.0001" id="energy" name="energy" readonly></input>
    </div>
`

export { electrostaticChargeTemplate, electrostaticHTML, EQVHTML, electrostaticDuoHTML, electrostaticTrioHTML };