let score = JSON.parse(localStorage.getItem
  ('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScoreElement();
    /*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;
//const autoPlay = () => {

//};

function autoPlay () {
  if (!isAutoPlaying) {
      intervalId = setInterval(() => {
      const playerMove =  pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});
document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});
document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key == 's') {
    playGame('Scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

let result = '';
  if (playerMove === 'Scissors') {

    if (computerMove === 'Scissors') {
    result = 'Tied';
  } else if ( computerMove === 'Rock' ) {
    result = 'You lose!';
  } else if (computerMove === 'Paper') {
    result = 'You win!';
  }
  
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Paper') {
        result = 'Tied';
      } else if (computerMove === 'Scissors') {
        result = 'You lose!'
      } else if (computerMove === 'Rock') {
        result = 'You win!'
      }

  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
        result = 'Tied';
      } else if (computerMove === 'Paper') {
        result = 'You lose!';
      } else if (computerMove === 'Scissors') {
        result = 'You win!'
      }
  }

  if (result === 'You win!') {
    score.wins = score.wins + 1;
  } else if (result === 'You lose!') {
    score.losses = score.losses + 1;
  } else if (result === 'Tied') {
    score.ties = score.ties +1;
  }

  localStorage.setItem('score', JSON.stringify(score));


  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img class="move-icon" src="${playerMove}-emoji.png">
<img class="move-icon" src="${computerMove}-emoji.png">
Computer`;

    }

    function updateScoreElement() {
      document.querySelector('.js-score').
    innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    };

  function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3 ) {
computerMove = 'Scissors'
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3 ) {
computerMove = 'Rock'
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
computerMove = 'Paper'
}

return computerMove;

}

$(document).ready(()=> {
  $('#form').submit((e) => {
    e.preventDefault();
    $.ajax({
      url : '/',
      type : 'post',
      contentType : 'application/json',
      data : JSON.stringify($('#form').serializeArray()),
      success : (response) => {
        console.log('successfully got your email.');
        console.log(response);
      }
    });
  });
});