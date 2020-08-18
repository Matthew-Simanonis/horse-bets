$(document).ready(function(){
    window.onload = radiobuttons();
    const radios = document.querySelector('.main');
    radios.addEventListener('click', e => {
        radiobuttons();
    });
});

function radiobuttons(){

    var background = 'rgba(10, 70, 10, 0.9';

    document.querySelectorAll('#first').forEach(element => {
        if(element.childNodes[1].checked == true) {
            element.style.background = 'gold';
            element.style.color = 'black';
            element.style.border = '2px solid yellow'
        }
        else{
            element.style.background = background;
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
            element.style.background = background
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
            element.style.background = background
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
            element.style.background = background
            element.style.color = 'white'
            element.style.border = '1px solid black'
        }
    });
}