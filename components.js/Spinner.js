//Loading spinner
import styles from '../styles/Home.module.css'

const Spinner = () => {

    return (
        <div className={styles.lds_spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner;

