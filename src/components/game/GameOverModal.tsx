
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <Card className="w-[350px] bg-slate-800 border-purple-500 text-white">
        <CardHeader>
          <CardTitle className="text-center hebrew-text text-2xl">המשחק נגמר!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="hebrew-text text-xl mb-2">הניקוד שלך:</div>
          <div className="text-4xl font-bold text-purple-400">{score}</div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onRestart} className="bg-purple-600 hover:bg-purple-700 hebrew-text">
            שחק שוב
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverModal;
