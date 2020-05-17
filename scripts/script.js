let hands = ['rock', 'paper', 'scissor'];

// get user's selection
function userPlay() {
  let player_hand;

  do {
    player_hand = prompt("Choose: rock, paper or scissor").toLowerCase();
  } while (!hands.includes(player_hand));

  return player_hand;
}

// randomly generate computer's hand
let computerPlay = () => hands[getRandomIntInclusive(0,2)];

// gets random interger between specified range
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// check winner of round
function playRound(player_selection, computer_selection) {
  let computer_hand = computerPlay();
  let player_hand = userPlay();
  let winner;

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

  alert(`Player: ${player_hand} \nComputer: ${computer_hand} \nWinner: ${winner}`);
  return winner;
}

// play full game until player or computer reaches the points stated
function playGame() {
  let points_to_win;
  let player_points = 0;
  let computer_points = 0;

  // check if points needed to win is valid
  do {
    points_to_win = Number(prompt("How many points to win the game?"));
  } while (points_to_win < 1 || isNaN(points_to_win));

  // keeps playing until either player or computer reaches the amount of points needed to win
  while (player_points < points_to_win && computer_points < points_to_win) {
    let round_winner = playRound();

    if (round_winner === "PLAYER") {
      player_points++;
    } else if (round_winner === "COMPUTER") {
      computer_points++;
    }

    alert(`SCOREBOARD \nPlayer: ${player_points} \nComputer: ${computer_points}`)
  }

  alert(`GAME OVER! \nPlayer: ${player_points} \nComputer: ${computer_points}`);
}