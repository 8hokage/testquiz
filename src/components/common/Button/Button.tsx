import { FC, PropsWithChildren } from "react";
import cls from 'classnames';
import styles from './styles.module.css';

export interface IButtonProps {
  type?: 'button' | 'submit',
  className?: string;
  onClick?: () => void;
}

export const Button: FC<IButtonProps & PropsWithChildren> = ({
  children, type = 'button', onClick, className 
}) => {
  return (
    <button 
      type={type} 
      className={cls(styles.button, className)} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}