import React from "react";
import { FirstCardProps } from "../types/Interface";

const FirstCard: React.FC<FirstCardProps> = ({ name, listeners }) => {
  return (
    <div className="gap-5">
      <h1 className="text-6xl font-bold">{name}</h1>
      <p className="text-gray-300">{listeners}</p>
    </div>
  );
};

export default FirstCard;
