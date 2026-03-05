import { useEffect, useState } from 'react';

interface LoadingProps {
  delay?: number;
}

export default function Loading({ delay = 200 }: LoadingProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return show ? <div>loading...</div> : null;
}
