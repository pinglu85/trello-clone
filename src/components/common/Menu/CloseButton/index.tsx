import CloseIcon from './x.svg';
import styles from './styles.module.css';

interface CloseButtonProps {
  className: string;
  onClick: () => void;
}

const CloseButton = ({ className, onClick }: CloseButtonProps): JSX.Element => {
  return (
    <button className={className} onClick={onClick}>
      <CloseIcon className={styles.icon} />
    </button>
  );
};

export default CloseButton;
