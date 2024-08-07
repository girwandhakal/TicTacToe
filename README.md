# Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game built using React. The game allows two players to take turns marking the spaces in a 3×3 grid, with the objective of placing three of their marks in a horizontal, vertical, or diagonal row.

## Features

- Two-player game (Player X and Player O)
- Displays the current player's turn
- Highlights the winning line
- Allows players to navigate through move history
- Sorts move history in ascending or descending order
- Indicates when the game ends in a draw
- Allows players to reset the game

## Components

### Square

Renders a single button representing a square on the board.

### Board

Handles the logic for the game board, including rendering squares and determining the game's status.

### Game

Manages the state of the game, including the history of moves, the current move, and the sorting of the move history.

# Getting Started

## Prerequisites

- Node.js and npm installed

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/tic-tac-toe-react.git
cd tic-tac-toe-react
```

##Install the dependencies:

```bash
npm install
```


##Running the app:

```bash
npm start
```
Open http://localhost:3000 to view the app in the browser.


#Usage

Click on any square to make a move.
The game status will update to show whose turn it is or if there's a winner/draw.
Use the buttons in the game info section to navigate through the move history.
Click the "Sort Ascending"/"Sort Descending" button to toggle the move history order.
Click the "Reset Game" button to start a new game.


