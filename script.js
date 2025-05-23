const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop,
  orientation: 'white'
});

const game = new Chess();

function makeBestMove() {
  const possibleMoves = game.moves();
  if (game.game_over()) return;

  const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  game.move(move);
  board.position(game.fen());
  updateStatus();
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';
  updateStatus();
  setTimeout(makeBestMove, 250);
}

function updateStatus() {
  let status = '';

  if (game.in_checkmate()) {
    status = 'Checkmate! Game over.';
  } else if (game.in_draw()) {
    status = 'Draw!';
  } else {
    status = (game.turn() === 'w' ? 'White' : 'Black') + ' to move';
    if (game.in_check()) {
      status += ', in check';
    }
  }

  document.getElementById('status').textContent = status;
}

updateStatus();
