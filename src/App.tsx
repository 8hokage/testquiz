import { useState } from 'react';
import './App.css';
import { Button } from './components/common/Button/Button';
import { getQuiz } from './api/getQuiz';
import { Quiz } from './components/Quiz/Quiz';
import { IQuizContext, QuizStatus, useQuizContext } from './contexts/QuizContext';
import styles from './styles.module.css';

function App() {
  const {data, setData, status, setStatus} = useQuizContext() as IQuizContext;
  const [isLoading, setIsLoading] = useState(false);


  const loadQuizData = async () => {
    setIsLoading(true);
    try {
    const res = getQuiz();
    setData(res);
    setIsLoading(false);
    setStatus(QuizStatus.RUNNING);
    } catch(e: any) {
   
    }
  }

  return (
    <main className={styles.main}>
        {!isLoading 
          && status === QuizStatus.DEFAULT 
          && <div className={styles.container}><Button 
              className={styles.button} 
              onClick={loadQuizData} 
              type='button'>
                Start quiz
              </Button></div>}
      {!isLoading 
        && data 
        && status !== QuizStatus.DEFAULT
        && <div className={styles.quizContainer}><Quiz /></div>}
      <div className={styles.transition}></div>
    </main>
  ); 
}

export default App;
