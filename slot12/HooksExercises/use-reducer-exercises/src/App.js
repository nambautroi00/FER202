import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import QuestionBank from './components/QuestionBank';
import EnhancedQuestionBank from './components/EnhancedQuestionBank';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">useReducer Hook Exercises</h1>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-6 mb-4">
          <CounterComponent />
        </div>
        
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <ToggleComponent />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <LoginForm />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <SignUpForm />
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="text-center mb-3">Basic Quiz</h2>
          <QuestionBank />
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="text-center mb-3">Enhanced Quiz (with Timer, Feedback, Progress & High Score)</h2>
          <EnhancedQuestionBank />
        </div>
      </div>
    </div>
  );
}

export default App;
