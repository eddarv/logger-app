import styles from '../styles/Home.module.css'

const DynamicTr = ({data}) => {

    return (
        <>
        {
            (data.map( (el,i) => {
                return(
                    <tr key={`td-${i}`} className={styles.tr}>
                        <td className={styles.td}>
                            {el.timestamp}
                        </td>
                        <td className={styles.td}>
                            {el.source}
                        </td>
                        <td className={styles.td}>
                            {el.id}
                        </td>
                        <td className={styles.td}>
                            {el.message}
                        </td>
                    </tr>
                )
            })) 
        }
        </>
    )
}
 
export default DynamicTr;