let hands = ['rock', 'paper', 'scissor'];
let game_over = false;
let game_initialised = false;
let points_to_win;
let player_points;
let computer_points;

const user_score = document.querySelector('#user-score');
const computer_score = document.querySelector('#computer-score');
const hand = document.getElementById('computer-hand').querySelector('i');

// listens for click on Play Button
const play_btn = document.querySelector('#play-button');
play_btn.addEventListener('click', event => {
  if (play_btn.textContent === 'PLAY' || play_btn.textContent === 'PLAY AGAIN') {
    play_btn.textContent = 'RESET';
  }

  initialiseGame();
});

const user_hands = document.querySelectorAll('.user-hands');
user_hands.forEach((user_hand) => {
  user_hand.addEventListener('click', event => {
    if (game_over === false && game_initialised === true) {
      let round_winner = playRound(user_hand.id);

      if (round_winner === "PLAYER") {
        player_points++;
      } else if (round_winner === "COMPUTER") {
        computer_points++;
      }

      updateScores(player_points, computer_points, points_to_win);
    }
  });
});

// Initialise the game by asking the user how many points to win the game and reset scores to 0
function initialiseGame() {
  player_points = 0;
  computer_points = 0;

  // check if points needed to win is valid
  do {
    points_to_win = Number(prompt("How many points to win the game?"));
  } while (points_to_win < 1 || isNaN(points_to_win));

  user_score.textContent = `${player_points}`;
  user_score.setAttribute('id', 'user-score');
  computer_score.textContent = `${computer_points}`;
  computer_score.setAttribute('id', 'computer-score');
  hand.classList.remove(...hand.classList);
  hand.classList.add('fas', 'fa-question', 'fa-4x');
  game_initialised = true;
  game_over = false;
}

// round logic
function playRound(user_choice) {
  let computer_hand = computerPlay();
  showComputersHand(computer_hand);
  let player_hand;
  let winner;

  switch (user_choice) {
    case 'user-rock':
      player_hand = 'rock';
      break;
    case 'user-paper':
      player_hand = 'paper';
      break;
    case 'user-scissor':
      player_hand = 'scissor';
      break;
  }

  if (player_hand === computer_hand) {
    winner = 'TIE';
  } else {

    if (player_hand === 'rock') {
      if (computer_hand === 'scissor') {
        winner = 'PLAYER';
      } else {
        winner = 'COMPUTER';
      }
    }

    if (player_hand === 'paper') {
      if (computer_hand === 'rock') {
        winner = 'PLAYER';
      } else {
        winner = 'COMPUTER';
      }
    }

    if (player_hand === 'scissor') {
      if (computer_hand === 'paper') {
        winner = 'PLAYER';
      } else {
        winner = 'COMPUTER';
      }
    }
  }

  return winner;
}

// show computer's hand
function showComputersHand(computer_hand) {
  hand.classList.remove(...hand.classList);

  if (computer_hand == 'rock') {
    hand.classList.add('far', 'fa-hand-rock', 'fa-4x', 'played');
    setTimeout(() => hand.classList.remove('played'), 500);
  } else if (computer_hand == 'paper') {
    hand.classList.add('far', 'fa-hand-paper', 'fa-4x', 'played');
    setTimeout(() => hand.classList.remove('played'), 500);
  } else if (computer_hand == 'scissor') {
    hand.classList.add('far', 'fa-hand-scissors', 'fa-4x', 'played');
    setTimeout(() => hand.classList.remove('played'), 500);
  }
}

// update player and computer scores
function updateScores(player_points, computer_points, points_to_win) {
  if (player_points < points_to_win && computer_points < points_to_win) {
    user_score.textContent = `${player_points}`;
    computer_score.textContent = `${computer_points}`;
  } else {
    if (player_points == points_to_win) {
      user_score.textContent = `WINNER: ${player_points}`;
      user_score.setAttribute('id', 'user-win');
    } else if (computer_points == points_to_win) {
      computer_score.textContent = `WINNER: ${computer_points}`;
      computer_score.setAttribute('id', 'computer-win');
    }

    play_btn.textContent = 'PLAY AGAIN';
    game_over = true;
  }
}

// randomly generate computer's hand
let computerPlay = () => hands[getRandomIntInclusive(0,2)];

// gets random interger between specified range
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}