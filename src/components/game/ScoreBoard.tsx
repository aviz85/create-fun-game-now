
import React from 'react';
import { Button } from "@/components/ui/button";
import { Timer, RefreshCw } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  timeLeft: number;
  onRestart: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, timeLeft, onRestart }) => {
  return (
    <div className="absolute top-4 right-4 left-4 z-10 flex justify-between items-center">
      <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-2">
        <Timer className="text-white" size={20} />
        <span className="text-white text-xl font-bold">{timeLeft}</span>
      </div>
      
      <div className="hebrew-text bg-black/50 backdrop-blur-sm p-4 rounded-lg">
        <span className="text-white text-xl font-bold">ניקוד: {score}</span>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onRestart} 
        className="bg-black/50 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
      >
        <RefreshCw className="mr-2" size={16} />
        <span className="hebrew-text">התחל מחדש</span>
      </Button>
    </div>
  );
};

export default ScoreBoard;
