import { ButtonDanger, ButtonPrimary } from '../../common/Button';
import styles from './styles.module.css';

const FormSubmitButton = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <ButtonPrimary type="submit" className={styles.FormSubmitButton}>
      {children}
    </ButtonPrimary>
  );
};

const FormSubmitButtonDanger = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return (
    <ButtonDanger type="submit" className={styles.FormSubmitButtonDanger}>
      {children}
    </ButtonDanger>
  );
};

export { FormSubmitButtonDanger };

export default FormSubmitButton;
