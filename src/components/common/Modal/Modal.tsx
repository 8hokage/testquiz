import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import styles from './styles.module.css';
import cls from 'classnames';
import { createPortal } from 'react-dom';

export interface IModalProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  backgroundClassName?: string;
  contentClassName?: string;
  preventCloseOnBackground?: boolean;
}

export function WithActionButton(Component: React.FC<any>) {
  const Wrapper: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen);
    }
    
    const handleClose = () => {
      setIsOpen(false);
    }
    
    return (
      <>
        {React.Children.map(children, (item) => {
          return React.cloneElement(item as ReactElement, {onClick: handleClick})
        })}
        <Modal
          onClose={handleClose}
          isOpen={isOpen}
        >
          <Component {...rest} onClose={handleClose} />
        </Modal>
      </>
    );
  }
  return Wrapper;
}

export const Modal: React.FC<IModalProps & React.PropsWithChildren> = ({
  isOpen,
  onClose,
  children,
  preventCloseOnBackground,
  className,
  backgroundClassName,
  contentClassName,
}): JSX.Element => {
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && delayedIsOpen) {
      setTimeout(() => {
        setDelayedIsOpen(false);
      }, 180);
    } else if (isOpen) {
      setDelayedIsOpen(true);
    }
  }, [delayedIsOpen, isOpen])

  return (
    <>
      {delayedIsOpen && createPortal(
        <div className={cls(styles.modal, className)}>
          <div onClick={!preventCloseOnBackground ? onClose : () => {}} className={cls(styles.background, backgroundClassName, {
            [styles.backgroundClose]: !isOpen
          })} />
          <div className={cls(styles.content, contentClassName,
            {
              [styles.modalClose]: !isOpen
            }
          )}>
            {children}
          </div>
        </div>, window.document.getElementById('modalRoot') as Element,
      )}
    </>
  )
}