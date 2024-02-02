import { FC } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import styles from './styles.module.css';
import { IQuizContext, useQuizContext } from "../../../contexts/QuizContext";

export interface ISuccessModalProps {
  isOpen: boolean;
  onAction: () => void;
}

export const SuccessModal: FC<ISuccessModalProps> = ({
  isOpen, onAction,
}) => {
  const {data, score} = useQuizContext() as IQuizContext;

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.successModal}>
        <p className={styles.heading}>Finish!</p>
        <p className={styles.score}>Your score {score} of {data?.length}</p>
        <Button onClick={onAction}>Finish</Button>
      </div>
    </Modal>
  );
}