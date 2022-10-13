import { useEffect, useRef } from 'react';

import joinClassNames from '../../utils/joinClassNames';
import styles from './styles.module.css';

const Textarea = ({
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.select();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className={joinClassNames(styles.Textarea, className)}
      autoFocus
      {...props}
    />
  );
};

export default Textarea;
