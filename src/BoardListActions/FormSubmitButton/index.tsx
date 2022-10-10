import { ButtonPrimary } from '../../common/Button';
import styles from './styles.module.css';

const FormSubmitButton = ({ children }: WithChildrenProps): JSX.Element => {
  return (
    <ButtonPrimary type="submit" className={styles.FormSubmitButton}>
      {children}
    </ButtonPrimary>
  );
};

export default FormSubmitButton;
