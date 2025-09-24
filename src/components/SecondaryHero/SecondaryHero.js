import styles from './SecondaryHero.module.css';
const SecondaryHero = ({image,title}) => {

  return (
    <>
    <div className={styles.banner}>
        <img src={image} alt={title}  className={styles.slide1} />

            <div className={styles.content}>
                <h1 className={styles['content-title']}>     
                    {title}
                </h1>
            </div>
    </div>
    </>
)
}

export default SecondaryHero
