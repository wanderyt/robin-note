import React, {useState} from 'react';

const NormalComponent = ({counter = 0}) => {
  console.log('normal component rerender');
  return (
    <div>Current counter: {counter}</div>
  );
};

const MemoComponent = React.memo(({counter = 0}) => {
  console.log('memo component rerender');
  return (
    <div>Current counter: {counter}</div>
  );
});

const NormalCounter = (props) => {
  const [counter, setCounter] = useState(0);
  const handleCounterClick = () => {
    setCounter(counter + 1);
  }

  const handleNoCounterClick = () => {
    setCounter(counter);
  }

  return (
    <div>
      <button onClick={handleCounterClick}>Counter</button>
      <button onClick={handleNoCounterClick}>No Counter</button>
      <NormalComponent counter={counter} />
    </div>
  )
};

const MemoCounter = (props) => {
  const [counter, setCounter] = useState(0);
  const handleCounterClick = () => {
    setCounter(counter + 1);
  }

  const handleNoCounterClick = () => {
    setCounter(counter);
  }

  return (
    <div>
      <button onClick={handleCounterClick}>Counter</button>
      <button onClick={handleNoCounterClick}>No Counter</button>
      <MemoComponent counter={counter} />
    </div>
  )
};

export {
  NormalCounter,
  MemoCounter,
};
