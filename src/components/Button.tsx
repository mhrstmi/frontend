import React from 'react';
import { useStateContext } from '../providers/ContextProvider';
import Text from './Text';

const Button: React.FC<any>  = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState }: any = useStateContext();

  return (
    <button
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      <Text fontSize={size} fontWeight='medium' >{icon} {text}</Text>
    </button>
  );
};

export default Button;
