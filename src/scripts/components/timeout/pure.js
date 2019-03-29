import React, {useState, useEffect} from 'react';

const Timeout = ({ms = 1000, children = () => void 0}) => {
  const [ownTimeout, setOwnTimeout] = useState(null);
  const [didTimeout, setDidTimeout] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setOwnTimeout(timeout);
      setDidTimeout(false);
    }, ms);

    return () => {
      clearTimeout(ownTimeout);
    };
  }, [ownTimeout, didTimeout]);

  return children(didTimeout);
};

export default Timeout;
