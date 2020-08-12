$(document).ready(function(){
    addHorses();
    reset();
    document.addEventListener("mouseup", radiobuttons())
    document.getElementById("horse-count-button").addEventListener('click', function(){
        addHorses();
    })
    document.getElementById("submit-all").addEventListener('click', function(){
        reset();
        orderResults();
    })
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            reset();
        });
    })

    var config = { attributes: true, childList: true, characterData: true }
    target=document.getElementById('horses-list')
    observer.observe(target, config);

    const radios = document.querySelector('.main')
    radios.addEventListener('click', e => {
        radiobuttons();
    });
})

function reset(){
    addScore();
    clearResults();
    radiobuttons();
}

function addHorses(){
    var horseCount = document.getElementById('horse-count').value;
    var currentHorses = $('#horses-list li').length;
    if (currentHorses <= horseCount) {
        for (i = currentHorses; i < horseCount; i++) {
            const horseID = 'horse-' + i;
            const li = document.createElement('li');
            const div = document.createElement('div');
            const bot = document.createElement('div');
            div.classList.add('races');
            bot.classList.add('jockey-trainer');
            li.classList.add('horse');
            li.setAttribute('id', horseID);
            li.innerHTML = `<div class=horse-name>Horse #${i + 1}</div>`;
            for (j = 0; j < 4; j++){
                innerText = `<div class=race id=race-${j}>
                                <div class=race-number>Race ${j+1}</div>
                                <label id='first' class='horse-button'>
                                    <input type="radio" id="horse-position" name="position-${horseID}-${j}" value="1">
                                    1st
                                </label>
                                <label id='second' class='horse-button'>
                                    <input type="radio" id="horse-position" name="position-${horseID}-${j}" value="2">
                                    2nd
                                </label>
                                <label id='third' class='horse-button'>
                                    <input type="radio" id="horse-position" name="position-${horseID}-${j}" value="3">
                                    3rd
                                </label>
                                <label id="fourth" class='horse-button'>
                                    <input type="radio" id="horse-position" name="position-${horseID}-${j}" value="0" checked>
                                    N/A
                                </label>
                                <label class='checkbox'> 
                                    <input id='past-jockey' type=checkbox></input>
                                    <span id='checkmark'></span>
                                </label>
                            </div>`
                div.innerHTML += innerText;
            }
            li.appendChild(div);
            bot.innerHTML += `<div class=additional-number>
                                Jockey
                            </div>
                                <input id='additional' type=number min=0 value=0 step=.1 onClick=this.select()></input>
                            <div class=additional-number>
                                Trainer
                            </div>
                            <input id='additional' type=number min=0 value=0 step=.1 onClick=this.select()></input>
                            <div class='score-label'>Score:</div>  
                            <div class='horse-score'></div>`
            li.appendChild(bot);
            document.querySelector('#horses-list').append(li);
                    }
                }
            }

function addScore(){
    document.querySelectorAll('.horse').forEach(element => {
        var jockeys = element.querySelectorAll('#past-jockey');
        var adds = element.querySelectorAll('#additional');
        var score = element.querySelector('.horse-score');
        var multipliers = {0 : 0, 1 : 3, 2 : 2, 3 : 1}
        var ids = element.querySelectorAll('#horse-position');
        let total = 0;
        let counter = 0;

        for(i = 0; i < 16; i++) {
            var newScore = 0;
            if (ids[i].checked == true){
                newScore = multipliers[ids[i].value];
            }
            
            if (jockeys[counter].checked == true){
                newScore *= 2;
            }
            else if(isNaN(newScore)){
                newScore = 0;
            }
            total += newScore;
            if ((i%4) == 3){
                counter ++;
            }
        }
        for(i = 0; i < 2; i++) {
            total += parseFloat(adds[i].value)
        }
        if(total > 99.8){
            total = 99.9;
        }
        else if(isNaN(total)){
            total=0;
        }
        score.innerHTML = total.toFixed(1);
    })
}

function removeButton(){
    document.querySelectorAll('#remove-horse').forEach(element => {
        var parent = element.parentElement;
        element.addEventListener('click', event =>{
           event.target.parentElement.remove(parent);
        })
    })
}

function orderResults(){
    var scores = {};
    var index = [];
    var winners = [];
    var currentHorses = $('#horses-list li').length;
    var j = 0;
    document.querySelectorAll('.horse-score').forEach(element => {
        var score = parseFloat(element.innerHTML);
        scores[j] = score;
        index.push(score);
        j++;
    })
    index = index.sort(function(a, b){return b-a});
    for(key in index){
        for(i = currentHorses; i > -1; i--){
            if (index[key] == scores[i]){
                winners.push(i);
                delete scores[i];            
            }
        }
    }
    for(horse in winners){
        var horseNum = parseInt(winners[horse]) + 1;
        const li = document.createElement('li');
        li.classList.add('horse-result');
        li.innerHTML = 'Horse ' + horseNum;
        document.querySelector('#results').append(li);
    }
}

function clearResults(){
    var results = document.querySelector('#results');
    while (results.hasChildNodes()) {  
        results.removeChild(results.firstChild);
      }
    }

function radiobuttons(){
    document.querySelectorAll('#first').forEach(element => {
        if(element.childNodes[1].checked == true) {
            element.style.background = 'gold';
            element.style.color = 'black';
            element.style.border = '2px solid yellow'
        }
        else{
            element.style.background = 'none'
            element.style.color = 'white'
            element.style.border = '1px solid black'
        }
    });
    document.querySelectorAll('#second').forEach(element => {
        if(element.childNodes[1].checked == true) {
            element.style.background = 'silver';
            element.style.color = 'black';
            element.style.border = '2px solid white'
        }
        else{
            element.style.background = 'none'
            element.style.color = 'white'
            element.style.border = '1px solid black'
        }
    });
    document.querySelectorAll('#third').forEach(element => {
        if(element.childNodes[1].checked == true) {
            element.style.background = 'rgb(179, 85, 41)';
            element.style.color = 'black';
            element.style.border = '2px solid rgb(59, 27, 12)'
        }
        else{
            element.style.background = 'none'
            element.style.color = 'white'
            element.style.border = '1px solid black'
        }
    });
    document.querySelectorAll('#fourth').forEach(element => {
        if(element.childNodes[1].checked == true) {
            element.style.background = 'rgb(48, 48, 48)';
            element.style.color = 'white';
            element.style.border = '2px solid black'
        }
        else{
            element.style.background = 'none'
            element.style.color = 'white'
            element.style.border = '1px solid black'
        }
    });
}