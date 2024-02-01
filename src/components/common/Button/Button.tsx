import { FC, PropsWithChildren } from "react";


export interface IButtonProps {
  type: 'button' | 'submit',
  className?: string;
  onClick: () => void;
}

export const Button: FC<IButtonProps & PropsWithChildren> = ({
  children, type = 'button', onClick, className 
}) => {
  return (
    <button 
      type={type} 
      className={className} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}