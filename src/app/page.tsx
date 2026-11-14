"use client";

import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Mark = "X" | "O";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinningLine(squares: Array<Mark | null>) {
  return WINNING_LINES.find(([first, second, third]) => {
    return (
      squares[first] !== null &&
      squares[first] === squares[second] &&
      squares[first] === squares[third]
    );
  });
}

export default function Home() {
  const [squares, setSquares] = useState<Array<Mark | null>>(
    Array<Mark | null>(9).fill(null),
  );
  const winningLine = getWinningLine(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  const isDraw = !winner && squares.every(Boolean);
  const currentPlayer: Mark =
    squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  const isGameOver = Boolean(winner || isDraw);

  function playSquare(index: number) {
    if (squares[index] || isGameOver) return;

    const nextSquares = [...squares];
    nextSquares[index] = currentPlayer;
    setSquares(nextSquares);
  }

  function startNewGame() {
    setSquares(Array<Mark | null>(9).fill(null));
  }

  const gameMessage = winner
    ? `${winner} takes the round!`
    : isDraw
      ? "It's a draw!"
      : `${currentPlayer}'s turn to play`;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="ambient ambient-two" />

      <section className="game-card relative z-10 w-full max-w-[500px]">
        <header className="flex items-center justify-between gap-4">
          <Link className="brand-mark" href="/" aria-label="Tic Tac Toe home">
            <span className="brand-tile brand-tile-x">X</span>
            <span className="brand-tile brand-tile-o">O</span>
            <span className="brand-tile brand-tile-x">X</span>
            <span className="brand-tile brand-tile-o">O</span>
          </Link>
          <div className="flex flex-col items-end gap-2">
            <span className="eyebrow">THE CLASSIC, REIMAGINED</span>
            <span className="online-note">
              <span className="online-dot" />
              JUST YOU TWO
            </span>
          </div>
        </header>

        <div className="mt-9 text-center sm:mt-10">
          <div className="mx-auto mb-3 flex w-fit items-center gap-1.5 rounded-full bg-[#f3efe8] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#77736c]">
            <Sparkles aria-hidden="true" className="size-3 text-[#d99564]" />
            A LITTLE FRIENDLY RIVALRY
          </div>
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <p className="mt-2 text-sm text-[#88837c]">
            Three in a row. Bragging rights forever.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#f8f6f1] px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-3">
            <div
              className={`player-token ${currentPlayer === "X" && !isGameOver ? "token-active-x" : "token-x"}`}
              aria-hidden="true"
            >
              X
            </div>
            <div>
              <p className="text-sm font-semibold text-[#302f2c]">Player one</p>
              <p className="text-xs text-[#9b968d]">The cross</p>
            </div>
          </div>
          <div className="turn-divider" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <div>
              <p className="text-right text-sm font-semibold text-[#302f2c]">
                Player two
              </p>
              <p className="text-right text-xs text-[#9b968d]">The nought</p>
            </div>
            <div
              className={`player-token ${currentPlayer === "O" && !isGameOver ? "token-active-o" : "token-o"}`}
              aria-hidden="true"
            >
              O
            </div>
          </div>
        </div>

        <div className="mt-5 flex min-h-14 items-center justify-center gap-2.5 rounded-2xl border border-[#efebe3] bg-white/70 px-4 py-3">
          {winner ? (
            <span
              aria-hidden="true"
              className={`result-mark ${winner === "X" ? "mark-x" : "mark-o"}`}
            >
              {winner}
            </span>
          ) : isDraw ? (
            <span aria-hidden="true" className="draw-sparkle">
              ✳
            </span>
          ) : (
            <span
              aria-hidden="true"
              className={`status-dot ${currentPlayer === "X" ? "status-x" : "status-o"}`}
            />
          )}
          <p
            aria-live="polite"
            className={`text-sm font-semibold ${winner ? "text-[#367f72]" : isDraw ? "text-[#8b765d]" : "text-[#4d4a44]"}`}
          >
            {gameMessage}
          </p>
        </div>

        <div
          aria-label="Tic-Tac-Toe board"
          className="board mt-5 grid grid-cols-3 gap-2.5 sm:gap-3"
          role="group"
        >
          {squares.map((square, index) => {
            const isWinningSquare = winningLine?.includes(index) ?? false;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${square ? `: ${square}` : ""}`}
                aria-pressed={Boolean(square)}
                className={`board-cell ${square === "X" ? "cell-x" : ""} ${square === "O" ? "cell-o" : ""} ${isWinningSquare ? "cell-winner" : ""}`}
                disabled={Boolean(square) || isGameOver}
                onClick={() => playSquare(index)}
              >
                {square}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <Button
            className="new-game-button h-12 w-full rounded-2xl text-sm font-semibold"
            onClick={startNewGame}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            New game
          </Button>
          <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-[#aaa49b]">
            TAKE TURNS · HAVE FUN · PLAY AGAIN
          </p>
        </div>
      </section>
    </main>
  );
}
