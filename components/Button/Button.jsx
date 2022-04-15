import styles from './Button.module.css';
const Button = (props) => {
    return <button type="submit" styles={styles.button}>{props.value}</button>
}
export default Button;