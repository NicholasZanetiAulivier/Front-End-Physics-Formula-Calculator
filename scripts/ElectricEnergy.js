import { calculateDuo, calculateStatic, calculateTrio, calculateEQV } from "/scripts/utils/ElectricFunctions.js";
import { electrostaticChargeTemplate, electrostaticDuoHTML, electrostaticTrioHTML, electrostaticHTML, EQVHTML } from "/scripts/utils/ElectricHTMLs.js";
import { electrostaticFacts, EQVFacts } from "./utils/ElectricText.js";
import { electroDuoFormula, electroTrioFormula, electrostaticFormula, EQVFormula } from "./utils/ElectricFormula.js";

let form = document.getElementById('inputForm');
let select = document.getElementById('subtype');
let div = document.getElementById('currentContext');
let facts = document.getElementById('facts');
let formula = document.getElementById('formula');

form.children[0].addEventListener('change', changeContents);
form.addEventListener('submit', calculateContents);

changeContents(null);
function changeContents(e) {
    switch (select.value) {
        case 'EQV': {
            div.innerHTML = EQVHTML;
            facts.innerHTML = EQVFacts;
            formula.innerHTML = EQVFormula;
            break;
        }
        case 'electrostatic': {
            div.innerHTML = electrostaticHTML;
            bindAddButtons();
            bindDeleteButtons();
            facts.innerHTML = electrostaticFacts;
            formula.innerHTML = electrostaticFormula
            break;
        }
        case 'electroDuo': {
            div.innerHTML = electrostaticDuoHTML;
            facts.innerHTML = electrostaticFacts;
            formula.innerHTML = electroDuoFormula
            break;
        }
        case 'electroTrio': {
            div.innerHTML = electrostaticTrioHTML;
            facts.innerHTML = electrostaticFacts;
            formula.innerHTML = electroTrioFormula
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
        case 'electroTrio': {
            let html = {
                q1: document.getElementById('charge1'),
                q2: document.getElementById('charge2'),
                q3: document.getElementById('charge3'),
                r12: document.getElementById('distance12'),
                r13: document.getElementById('distance13'),
                r23: document.getElementById('distance23'),
                E: document.getElementById('energy')
            }
            calculateTrio(html);
        }

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
    e.target.parentElement.parentElement.after(newCharge);
    let children = newCharge.children[2].children;
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
        let grandParent = parentsParent.parentElement
        grandParent.removeChild(parentsParent);
    }
}