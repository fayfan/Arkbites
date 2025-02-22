import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import './OperatorPage.css';

const OperatorPage = () => {
  const navigate = useNavigate();
  const { displayNumber } = useParams();
  const user = useSelector(state => state.session.user);
  const operators = useSelector(state => state.operators);
  const operator = operators[displayNumber];

  if (!operator) return <h2>Loading...</h2>;

  return (
    <main className="operator-page-main">
      <h1>{operator.name}</h1>
    </main>
  );
};

export default OperatorPage;
