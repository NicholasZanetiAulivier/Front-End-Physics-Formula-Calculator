function calculateEQV(table) {
    let values = {};
    for (const k in table) {
        let v = table[k];
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
        table.E.readOnly = false;
        table.E.value = subTotal;
        table.E.readOnly = true;
    } else {
        alert('Fill in all of the blank values (Cannot be 0!)');
    }
}

function calculateDuo(table) {
    let values = {};
    for (const k in table) {
        let v = table[k];
        values[k] = null;
        if (Number(v.value) || v.value == "0") values[k] = new Number(v.value);
        console.log(values);
    }

    //E = kq1q2/r
    if (values.E instanceof Number) {
        let hasQ1 = values.q1 instanceof Number;
        let hasQ2 = values.q2 instanceof Number;
        let hasR = values.r instanceof Number;
        //E = kq1q2/?
        if (hasQ1 && hasQ2 && !hasR) {
            values.r = new Number(values.q1 * values.q2 * 8.98755 / values.E / 1000);
            table.r.value = values.r;
        }
        //E = kq1?/r
        else if (hasQ1 && !hasQ2 && hasR) {
            values.q2 = new Number(values.E * values.r * 1000 / 8.98755 / values.q1);
            table.q2.value = values.q2;
        }
        //E = k?q2/r
        else if (!hasQ1 && hasQ2 && hasR) {
            values.q1 = new Number(values.E * values.r * 1000 / 8.98755 / values.q2);
            table.q1.value = values.q1;
        }
        //E = kq1q2/r (Replace)
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

function calculateTrio(table) {
    let values = {};
    for (const k in table) {
        let v = table[k];
        values[k] = null;
        if (Number(v.value) || v.value == "0") values[k] = new Number(v.value);
        console.log(values);
    }

    if (values.q1 instanceof Number &&
        values.q2 instanceof Number &&
        values.q3 instanceof Number &&
        values.r12 instanceof Number &&
        values.r13 instanceof Number &&
        values.r23 instanceof Number
    ) {
        let temp12 = values.q1 * values.q2 / values.r12;
        let temp13 = values.q1 * values.q3 / values.r13;
        let temp23 = values.q3 * values.q2 / values.r23;

        values.E = (temp12 + temp13 + temp23) * 8.98755 / 1000;
        console.log(table);
        table.E.readOnly = false;
        table.E.value = values.E;
        table.E.readOnly = true;
    }

}

export { calculateDuo, calculateEQV, calculateStatic, calculateTrio };