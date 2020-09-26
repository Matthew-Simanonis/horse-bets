// Reset Everything on load
addHorses();
reset();

// EventListener addScore on click
document.addEventListener('click', function(){
    addScore();
})

// EventListener for Add Horse Button
document.getElementById("horse-count-button").addEventListener('click', function(){
    addHorses();
})

//  EventListener for Submit Button
document.getElementById("submit-all").addEventListener('click', function(){
    reset();
    orderResults();
})

// Scoring button animation
document.querySelectorAll('.scoring-button').forEach(element => {
    element.addEventListener('click', function(){
    // Show
    if($('#scoring').css('opacity') == 0){
        $('#scoring').toggleClass('show');
        $('#scoring').animate({ opacity: 1}, 300);
        }   
    // Hide 
    else if($('#scoring').css('opacity') == 1){
        $('#scoring').animate({ opacity: 0}, 300);
        setTimeout(() => {
            $('#scoring').toggleClass('show');}, 301);
        }
    });
});


// addScore calculates each horses score, clearResults clears all results
function reset(){
    addScore();
    clearResults();
}


// Create and adds Horses as li to ul
function addHorses(){
    // find number of horses
    var horseCount = document.getElementById('horse-count').value;
    var currentHorses = $('#horses-list li').length;
    // check horse count
    if (currentHorses <= horseCount) {
        // for number of horses~
        for (i = currentHorses; i < horseCount; i++) {
            // create horse div
            const horseID = 'horse-' + i;
            const li = document.createElement('li');
            li.classList.add('horse');
            li.setAttribute('id', horseID);
            // create titles div
            const top = document.createElement('div');
            top.classList.add('horse-top')
            // create races div
            const div = document.createElement('div');
            div.classList.add('races');
            // create jockey/trainer div
            const bot = document.createElement('div');
            bot.classList.add('jockey-trainer');
            // add horse img + #number
            top.innerHTML = `<div class=horse-name><img src="/static/img/horse-logo-${i % 4}.png">Horse #${i + 1}</div>`;
            // For 4 races
            for (j = 0; j < 4; j++){
                // add race html
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
            // add jockey/trainer/score html
            bot.innerHTML += `<div class=additional-number>
                                Jockey
                            </div>
                                <input id='additional' type=number min=0 value=0 step=.1 onClick=this.select()></input>
                            <div class=additional-number>
                                Trainer
                            </div>
                            <input id='additional' type=number min=0 value=0 step=.1 onClick=this.select()></input>
                            <div class=additional-number>
                                Work
                            </div>
                            <input id='additional' type=number min=0 value=0 step=.1 onClick=this.select()></input>
                            <div class='score-label'>Score:</div>  
                            <div class='horse-score'></div>`
            // add divs to race li
            li.appendChild(top);
            li.appendChild(div);
            li.appendChild(bot);
            // add race to horse-list ul
            document.querySelector('#horses-list').append(li);
        }
    }
}

// Calculates and adds score for each horse/race
function addScore(){
    // For each horse
    document.querySelectorAll('.horse').forEach(element => {
        // Past jockey checkbox
        var jockeys = element.querySelectorAll('#past-jockey');
        // Jockey/trainer score
        var adds = element.querySelectorAll('#additional');
        // Horse score
        var score = element.querySelector('.horse-score');
        // Horse id
        var ids = element.querySelectorAll('#horse-position');
        var multipliers = {0 : 0, 1 : 3, 2 : 2, 3 : 1}
        let total = 0;
        let jockeyCounter = 0;

        for(i = 0; i < 16; i++) {
            var newScore = 0;
            // Check horse positions for selected, add (score * multiplier)
            if (ids[i].checked == true){
                newScore = multipliers[ids[i].value];
            }
            // Double score if jockey box is checked
            if (jockeys[jockeyCounter].checked == true){
                newScore *= 2;
            }
            // NaN bug fix
            else if(isNaN(newScore)){
                newScore = 0;
            }
            // Add score to total
            total += newScore;
            // Loop after 4, as theres 1 jockey/trainer score every 4 races
            if ((i%4) == 3){
                jockeyCounter ++;
            }
        }
        // Add Jockey/Trainer score to total
        for(i = 0; i < 3; i++) {
            total += parseFloat(adds[i].value)
        }
        // Max Score of 99.9
        if(total > 99.8){
            total = 99.9;
        }
        // NaN bug fix
        else if(isNaN(total)){
            total=0;
        }
        // Change html to new total
        score.innerHTML = total.toFixed(1);
    })
}

// EventListener for remove button
function removeButton(){
    document.querySelectorAll('#remove-horse').forEach(element => {
        var parent = element.parentElement;
        element.addEventListener('click', event =>{
           event.target.parentElement.remove(parent);
        })
    })
}


// Calculates, orders and adds results
function orderResults(){
    var scores = {};
    var index = [];
    var orderedScores = [];
    var winners = [];
    var currentHorses = $('#horses-list li').length;
    var j = 0;
    
    // Find score, add to list
    document.querySelectorAll('.horse-score').forEach(element => {
        var score = parseFloat(element.innerHTML);
        scores[j] = score;
        index.push(score);
        j++;
    })

    // Sort scores list
    index = index.sort(function(a, b){return b-a});

    for(key in index){
        for(i = currentHorses; i > -1; i--){
            if (index[key] == scores[i]){
                orderedScores.push(scores[i]);
                winners.push(i);
                delete scores[i];            
            }
        }
    }

    // Create li element with Horse # for each horse
    for(horse in winners){
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.innerHTML = 'Score: ' + orderedScores[horse];
        div.classList.add('result-score');
        var horseNum = parseInt(winners[horse]) + 1;
        li.classList.add('horse-result');
        li.innerHTML = 'Horse #' + horseNum;
        li.append(div);
        // Add li element to results ul
        document.querySelector('#results').append(li);
    }
}


// Clear results list
function clearResults(){
    var results = document.querySelector('#results');
    while (results.hasChildNodes()) {  
        results.removeChild(results.firstChild);
      }
    }

