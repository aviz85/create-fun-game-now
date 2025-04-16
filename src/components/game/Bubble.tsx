
import React, { useState, useEffect } from 'react';

interface BubbleProps {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  value: number;
  speed: number;
  onClick: (id: number, value: number) => void;
}

const Bubble: React.FC<BubbleProps> = ({ id, size, x, y, color, value, speed, onClick }) => {
  const [popped, setPopped] = useState(false);

  const handleClick = () => {
    if (!popped) {
      setPopped(true);
      onClick(id, value);
    }
  };

  useEffect(() => {
    if (popped) {
      const timer = setTimeout(() => {
        // This timeout lets the pop animation finish before the bubble is removed by the parent
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [popped]);

  const speedStyle = {
    animationDuration: `${speed}s`
  };

  return (
    <div
      className={`bubble ${popped ? 'bubble-pop' : ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        background: color,
        ...speedStyle
      }}
      onClick={handleClick}
    >
      {!popped && value}
    </div>
  );
};

export default Bubble;
