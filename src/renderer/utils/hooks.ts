import { useState, useEffect } from 'react';

export const useWindowResize = function() {
  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [size, setReSize] = useState(getSize());
  useEffect(() => {
    window.onresize = () => setReSize(getSize());
  }, []);
  return size;
};

interface NetWork {
  isOnline?: boolean;
  effectiveType?: string;
}

export const useNetWork = function(): NetWork {
  const connection = (window.navigator as any).connection;

  const [networkInfo, setNetwork] = useState({
    isOnline: navigator.onLine,
    effectiveType: connection.effectiveType
  });

  useEffect(() => {
    window.ononline = function() {
      setNetwork({ isOnline: true, effectiveType: connection.effectiveType });
    };
    window.onoffline = function() {
      setNetwork({
        isOnline: false,
        effectiveType: connection.effectiveType
      });
    };
  });
  return networkInfo;
};

export const useTitle = function(t: string): void {
  useEffect(() => {
    window.document.title = t;
  }, [t]);
};

// export const use