function createSquare(){

    const colors = [
        "#2a9d8f",
        "#e9c46a",
        "#f4a261",
        "#e76f51",
    ]

    const section = document.querySelector('section');
    const square = document.createElement('span');

    if (Math.random() <= 0.5){
        square.classList.add(`X`);
        square.setAttribute('playerIcon', `${player1.marker}`);
    } else {
        square.classList.add('O');
        square.setAttribute('playerIcon', `${player2.marker}`);
    }

    var size = Math.random() * 25;

    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';
    square.style.fontSize = 50 + size + 'px';

    square.style.top = Math.random() * innerHeight + 'px';
    square.style.left = Math.random() * innerWidth + 'px';

    const bg = colors[Math.floor(Math.random() * colors.length)];
    square.style.color = bg;


    section.appendChild(square);

    setTimeout(() =>{
        square.remove();
    },4000)
}

setInterval(createSquare, 150);