import React from "react";

export function DoodleBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-10">
      {/* Random doodle elements */}
      <div className="absolute top-[10%] left-[5%] w-16 h-16 text-blue-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M30,10 Q50,5 70,10 T90,30 Q95,50 90,70 T70,90 Q50,95 30,90 T10,70 Q5,50 10,30 T30,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute top-[20%] right-[10%] w-20 h-20 text-purple-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M20,20 C40,0 60,0 80,20 S100,60 80,80 S40,100 20,80 S0,40 20,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute bottom-[15%] left-[15%] w-24 h-24 text-green-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M30,10 L10,30 L30,50 L10,70 L30,90 L50,70 L70,90 L90,70 L70,50 L90,30 L70,10 L50,30 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute top-[40%] left-[40%] w-32 h-32 text-yellow-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
      <div className="absolute bottom-[25%] right-[20%] w-28 h-28 text-red-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M10,30 Q30,5 50,30 T90,30 Q70,50 90,70 T50,70 Q30,95 10,70 T50,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute top-[70%] right-[5%] w-16 h-16 text-blue-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M20,20 L80,20 L80,80 L20,80 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
          />
        </svg>
      </div>
      <div className="absolute top-[5%] left-[30%] w-12 h-12 text-indigo-500">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M50,10 L90,50 L50,90 L10,50 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
