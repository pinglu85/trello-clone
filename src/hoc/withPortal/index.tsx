import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactPortal } from 'react';

const withPortal = <T,>(
  rootId: string,
  WrappedComponent: React.ComponentType<T>
): ((props: T) => ReactPortal | null) => {
  const WithPortal = (props: T): ReactPortal | null => {
    const [mounted, setMounted] = useState(false);
    const root = useRef<HTMLElement | null>(null);

    useEffect(() => {
      setMounted(true);
      root.current = document.getElementById(rootId);

      return () => {
        setMounted(false);
        root.current = null;
      };
    }, []);

    return mounted && root.current
      ? createPortal(
          <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />,
          root.current
        )
      : null;
  };

  return WithPortal;
};

export default withPortal;
