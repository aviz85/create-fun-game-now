
import React, { useState, useEffect, useRef } from 'react';
import Bubble from './Bubble';
import ScoreBoard from './ScoreBoard';
import GameOverModal from './GameOverModal';
import { useToast } from "@/components/ui/use-toast";

interface BubbleType {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  value: number;
  speed: number;
}

const GAME_DURATION = 60; // Game duration in seconds
const BUBBLE_SPAWN_RATE = 1000; // Spawn a new bubble every 1000ms
const MIN_BUBBLE_SIZE = 40;
const MAX_BUBBLE_SIZE = 80;

const BUBBLE_COLORS = [
  'hsl(var(--game-purple))',
  'hsl(var(--game-orange))',
  'hsl(var(--game-blue))',
];

const BubbleGame: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const bubbleIdCounter = useRef(0);
  const { toast } = useToast();

  // Start the game
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive]);

  // Bubble spawning
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      if (gameContainerRef.current) {
        spawnBubble();
      }
    }, BUBBLE_SPAWN_RATE);

    return () => clearInterval(spawnInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive]);

  // Clean up bubbles that have floated off screen
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.filter(bubble => {
          const bubbleElement = document.getElementById(`bubble-${bubble.id}`);
          return bubbleElement !== null;
        })
      );
    }, 3000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const spawnBubble = () => {
    if (!gameContainerRef.current) return;
    
    const containerWidth = gameContainerRef.current.offsetWidth;
    const size = Math.floor(Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) + MIN_BUBBLE_SIZE);
    const x = Math.floor(Math.random() * (containerWidth - size));
    const color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
    const value = Math.floor(Math.random() * 10) + 1; // Random value between 1-10
    const speed = Math.random() * 8 + 5; // Random speed between 5-13 seconds
    
    const newBubble: BubbleType = {
      id: bubbleIdCounter.current++,
      size,
      x,
      y: 0, // Start from bottom
      color,
      value,
      speed,
    };
    
    setBubbles(prevBubbles => [...prevBubbles, newBubble]);
  };

  const handleBubblePop = (id: number, value: number) => {
    // Update score
    setScore(prevScore => prevScore + value);
    
    // Show score popup
    toast({
      description: `+${value}`,
      duration: 1000,
    });
    
    // Remove bubble after animation
    setTimeout(() => {
      setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
    }, 300);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBubbles([]);
    setGameOver(false);
    setGameActive(true);
    bubbleIdCounter.current = 0;
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
  };

  return (
    <div ref={gameContainerRef} className="game-container">
      <ScoreBoard 
        score={score} 
        timeLeft={timeLeft}
        onRestart={startGame}
      />
      
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          id={bubble.id}
          size={bubble.size}
          x={bubble.x}
          y={bubble.y}
          color={bubble.color}
          value={bubble.value}
          speed={bubble.speed}
          onClick={handleBubblePop}
        />
      ))}
      
      {gameOver && <GameOverModal score={score} onRestart={startGame} />}
    </div>
  );
};

export default BubbleGame;
