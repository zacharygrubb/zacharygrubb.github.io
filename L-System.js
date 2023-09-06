const start = document.querySelector('#start');
const pageList = document.querySelector('#generation-list');

//Create rules, comment out terminal vocab and make sure startingRules are equal to number of rules
//possible character should be set below to work with count
//Gestures should match characters

/*
FOR ANDREW
-

*/

const rules = {
    A : ['+EB', '-EC'],
    B : ['+F++C', '+BA'],
    C : ['--A+++G', 'E+D'],
    D : ['++B---G', '+F'],
    E : ['+D', '-CA'],
    F : ['--G------B', '--G------B'],
    G : ['A++D', 'F'],
    gestures : ['static', 'trills', 'tremoli', 'glissandi', 'arpeggiation', 'contrapuntal', 'articulation']
};
const startingRules = Object.freeze([true, true, true, true, true, true, true]);
const keyCenters = {
    'C' : ['G, D-45c', 'Bb-31c, Bb+30c', 'E-14c, Ab+41c', 'C, F#+30c', '--', 'C', 'F-29c, F#-49c'],
    'Db-20c' : ['Ab-20c, D+35c', 'Bb+50c, B+10c', 'F-35c, A+20c', 'Db-20c, G+10c', '--', 'Db', 'F#-49c, F#+30c'],
    'Db-40c' : ['A-40c, Eb+15c', 'B+30c, C-10c', 'F#-15c, Bb', 'D-40c, Ab-10c', '--', 'D-50c', 'F#+30c, G+10c'],
    'Db+40c' : ['A+40c, E', 'C+10c, C#-30c', 'G#+25c, B-20c', 'D+40c, A-30c', '--', 'D+50c', 'G+10c, Ab-10c'],
    'Eb+20c' : ['Bb+20c, F-25c', 'C#-11c, C#+50c', 'G+5c, C-40c', 'Eb+20c, A+50c', '--', 'Eb', 'Ab-10c, A-30c'],
    'E' : ['B, F#-45c', 'D-31c, D+30c', 'Ab-15c, C+41c', 'E, Bb+30c', '--', 'E', 'A-29c, Bb-49c'],
    'F-20c' : ['C-20c, F#+35c', 'D+50c, Eb+10c', 'A-35c, C#+20c', 'F-20c, B+10c', '--', 'F', 'A+50c, Bb+30c'],
    'F#-40c' : ['C#-40c, G+15c', 'Eb+30c, E-10c', 'A+45c, D', 'F#-40c, C-10c', '--', 'F#-50c', 'Bb+30c, B+10c'],
    'F#+40c' : ['C#+40c, Ab', 'E+10c, F-30c', 'Bb+25c, Eb-20c', 'F#+40c, C#-30c', '--', 'F#+50c', 'B+10c, C-10c'],
    'G+20c' : ['D+20c, A-25c', 'F-11c, F+50c', 'B+5c, E-40', 'G+20c, C#+50c', '--', 'G', 'C-10c, C#-30c'],
    'G#' : ['Eb, Bb-45c', 'F#-31c, F#+30c', 'C-14c, E+41c', 'G#, D+30c', '--', 'G#', 'C#-29c, D-49c'],
    'A-20c' : ['E-20c, Bb+35c', 'F#+50c, G+10c', 'C#-35c, F+20c', 'A-20c, Eb+10c', '--', 'A', 'C#+50c, D+30c'],
    'Bb-40c' : ['F-40c, B+15c', 'G+30c, G#-10c', 'C#+45c, F#', 'Bb-40c, E-10c', '--', 'Bb-50c', 'D+30c, Eb+10c'],
    'Bb+40c' : ['F+40c, C', 'G#+10c, A-30c', 'D+25c, G-20c', 'Bb+40c, F-30c', '--', 'Bb+50c', 'Eb+10c, E-10c'],
    'Bb+20c' : ['F#+20c, C#-25c', 'A-11c, A+50c', 'Eb, Ab-39c', 'B+20c, F+50c', '--', 'B', 'E-10c, F-30c']
};

function count(str, char, flip) {
    let count = 0;

    for (let i in str) {
        if (str[i] == char && count < 3) {
            count += 1;
        } else if (count >= 3) {
            return !flip;
        }
    }
    if (count >= 3) {
        return !flip;
    } else {
        return flip;
    }
}

function nextGeneration(sentence, generations, key, change, terminal, ruleSet) {
    let currentSentence = sentence;
    let newSentence = '';
    let finalSentence = '';
    let iterations = generations - 1;
    let letterKey = key;

    let newChange = change;
    
    const ruleOpp = (ruleSet == 0) ? -1 : 1;
    
    console.log(startingRules);
    for (let i in currentSentence) {
        if (Object.keys(rules).includes(currentSentence[i]) && !terminal.includes(currentSentence[i])) {
            if (newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2]) {
                for (let e of rules[currentSentence[i]][ruleSet]) {
                    if (e !== '+' && e !== '-') {
                        newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2] = count(newSentence, e, newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2]);
                    } else {
                        //pass
                    }
                }
                if (newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2]) {
                    newSentence += rules[currentSentence[i]][ruleSet];
                } else {
                    newSentence += rules[currentSentence[i]][ruleSet - ruleOpp];
                }
            } else {
                for (let e in rules[currentSentence[i]][ruleSet - ruleOpp]) {
                    if (e !== '+' && e !== '-') {
                        newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2] = count(newSentence, e, newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2]);
                    } else {
                        //pass
                    }
                }
                if (newChange[Object.keys(rules).toString().indexOf(currentSentence[i])/2]) {
                    newSentence += rules[currentSentence[i]][ruleSet];
                } else {
                    newSentence += rules[currentSentence[i]][ruleSet - ruleOpp];
                }
            }
        } else if (currentSentence[i] == '+') {
            newSentence += '+';
        } else if (currentSentence[i] == '-') {
            newSentence += '-';
        } else {
            //for terminal vocab
        }
    }

    const frag = document.createDocumentFragment();
    const table = frag.appendChild(document.createElement("div"));
    
    for (let i in newSentence) {
        if (newSentence[i] !== '+' && newSentence[i] !== '-') {
            const td = document.createElement("td");
            td.innerHTML = `<div>${newSentence[i]}</div>
                            <div>${rules.gestures[Object.keys(rules).toString().indexOf(newSentence[i])/2]}</div>
                            <div>Center: ${Object.keys(keyCenters)[letterKey]}</div>
                            <div>Partials: ${keyCenters[Object.keys(keyCenters)[letterKey]][Object.keys(rules).toString().indexOf(newSentence[i])/2]}</div>`
            table.appendChild(td);
            finalSentence += `(${letterKey})`;
            finalSentence += newSentence[i];
            finalSentence += `(${rules.gestures[Object.keys(rules).toString().indexOf(newSentence[i])/2]})`;
        } else if (newSentence[i] == '+') {
            if (letterKey > 13) {
                letterKey -= 14;
            } else {
                letterKey += 1;
            }
            finalSentence += newSentence[i];
        } else if (newSentence[i] == '-') {
            if (letterKey < 1) {
                letterKey += 14;
            } else {
                letterKey -= 1;
            }
            finalSentence += newSentence[i];
        } else {
            //for terminal vocab
            finalSentence += newSentence[i];
        }
    }

    const axiomTitle = document.createElement("h4");
    axiomTitle.innerHTML = `Axiom: ${document.querySelector('#axiom').value}`;
    if (document.getElementById(`gen${document.querySelector('#generationNum').value - generations + 1}`) == null) {
        const generationDiv = document.createElement("div");
        generationDiv.setAttribute("id", `gen${document.querySelector('#generationNum').value - generations + 1}`);
        const spacer = document.createElement("h3");
        spacer.innerHTML = `Generation: ${document.querySelector('#generationNum').value - generations + 1}`;
        
        generationDiv.appendChild(spacer);
        generationDiv.appendChild(axiomTitle);
        generationDiv.appendChild(table);
        pageList.appendChild(generationDiv);
    } else {
        const generationDiv = document.getElementById(`gen${document.querySelector('#generationNum').value - generations + 1}`);
        
        generationDiv.appendChild(axiomTitle);
        generationDiv.appendChild(table);
        pageList.appendChild(generationDiv);
    }
    
    console.log(finalSentence);
    if (generations > 1) {
        nextGeneration(newSentence, iterations, letterKey, newChange, terminal, ruleSet);
    }
}

start.onclick = function() {
    console.log("STARTING");
    const totalGenerations = document.querySelector('#generationNum').value;
    const axiom = document.querySelector('#axiom').value;
    const terminal = document.querySelector('#terminal').value;
    const ruleSet = document.querySelector('#rules').value;
    
    nextGeneration(axiom, totalGenerations, 0, startingRules, terminal, ruleSet);
}