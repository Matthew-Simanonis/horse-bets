$(document).ready(function(){
    addHorses();
    reset();
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
})

function reset(){
    removeButton();
    addScore();
    clearResults();
}

function addHorses(){
    var horseCount = document.getElementById('horse-count').value;
    var currentHorses = $('#horses-list li').length;
    if (currentHorses <= horseCount) {
        for (i = currentHorses; i < horseCount; i++) {
            const horseID = 'horse-' + i
            const li = document.createElement('li');
            li.classList.add('horse')
            li.setAttribute('id', horseID)
            li.innerHTML = `<div class=horse-name>Horse ${i + 1}</div>
                            <input id='horse-position' type=number min=0 max=3 value=0 onClick=this.select()></input>
                            <label class='checkbox'>
                                <input id='past-jockey' type=checkbox></input>
                                <span id='checkmark'></span>
                            </label>
                            <input id='horse-position' type=number min=0 max=3 value=0 onClick=this.select()></input>
                            <label class='checkbox'>
                                <input id='past-jockey' type=checkbox></input>
                                <span id='checkmark'></span>
                            </label>
                            <input id='horse-position' type=number min=0 max=3 value=0 onClick=this.select()></input>
                            <label class='checkbox'>
                                <input id='past-jockey' type=checkbox></input>
                                <span id='checkmark'></span>
                            </label>
                            <input id='horse-position'" type=number min=0 max=3 value=0 onClick=this.select()></input>
                            <label class='checkbox'>
                                <input id='past-jockey' type=checkbox></input>
                                <span id='checkmark'></span>
                            </label>
                            <input id='additional' type=number min=0 value=0 onClick=this.select()></input>
                            <input id='additional' type=number min=0 value=0 onClick=this.select()></input>
                            <div class='horse-score'></div>
                            <button id='remove-horse'>Remove</button>`;
            document.querySelector('#horses-list').append(li);
        }
    }
}

function addScore(){
    document.querySelectorAll('.horse').forEach(element => {
        var ids = element.querySelectorAll('#horse-position');
        var jockeys = element.querySelectorAll('#past-jockey');
        var adds = element.querySelectorAll('#additional');
        var score = element.querySelector('.horse-score');
        var multipliers = {0 : 0, 1 : 3, 2 : 2, 3 : 1}
        let total = 0;

        for(i = 0; i < 4; i++) {
            var newScore = multipliers[ids[i].value]
            if (jockeys[i].checked == true){
                newScore *= 2;
            }
            else if(isNaN(newScore)){
                newScore = 0;
            }
            total += newScore;
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
        var parent = element.parentElement
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

