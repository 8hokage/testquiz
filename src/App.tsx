import { useState } from 'react';
import './App.css';
import { Button } from './components/common/Button/Button';
import { getQuiz } from './api/getQuiz';
import { Quiz } from './components/Quiz/Quiz';
import { IQuizContext, QuizStatus, useQuizContext } from './contexts/QuizContext';

function App() {
  const {data, setData, status} = useQuizContext() as IQuizContext;
  const [isLoading, setIsLoading] = useState(false);

  const loadQuizData = async () => {
    setIsLoading(true);
    try {
    const res = getQuiz();
    setData(res);
    setIsLoading(false);
    } catch(e: any) {
   
    }
  }

  return (
    <main className="main">
      {!isLoading && data !== null && <Button onClick={loadQuizData} type='button'>Start quiz</Button>}
      {!isLoading 
        && data 
        && <Quiz />}
      {status === QuizStatus.FAILED && <p>Test failed</p>}
    </main>
  );
}

export default App;
