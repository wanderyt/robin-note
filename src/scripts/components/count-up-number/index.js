import React, {useState, useEffect} from 'react';

const AutoUpdateNumber = ({data = 11086.00}) => {
  const [currentVal, setCurrentVal] = useState(10000);
  const diff = data - currentVal;
  const step = diff / 1000;

  useEffect(() => {
    let interval = setInterval(() => {
      let tempVal = currentVal + step;
      if (tempVal >= data) {
        tempVal = data;
        clearInterval(interval);
      }
      setCurrentVal(tempVal);
    }, 1);
  }, []);

  return (
    <div className='AutoUpdateNumber'>
      {parseFloat(currentVal).toFixed(2)}
      {/* {parseFloat(data).toFixed(2)} */}
    </div>
  )
};

export default AutoUpdateNumber;
