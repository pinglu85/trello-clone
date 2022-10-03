import { createPortal } from 'react-dom';
import type { ReactPortal } from 'react';

const withPortal = <T,>(
  rootId: string,
  WrappedComponent: React.ComponentType<T>
): ((props: T) => ReactPortal | null) => {
  const WithPortal = (props: T): ReactPortal | null => {
    const rootEl = document.getElementById(rootId);

    return (
      rootEl &&
      createPortal(
        <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />,
        rootEl
      )
    );
  };

  return WithPortal;
};

export default withPortal;
