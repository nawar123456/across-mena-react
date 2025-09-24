import { t } from 'i18next';
import MainContainer from '../../components/MainContainer/MainContainer';
import styles from './Heading.module.css';

const Heading = ({showUnderDevelop, title,body , styleHeadingBody,width100}) => {
  return (
    <MainContainer hasPadding={false} width100={width100}>
    <div className={styles['section-heading']} >
      <h2 className={styles['heading-title']}>
      {title}
      {showUnderDevelop &&
      <span className={styles['under-developemnt-text']}>
        ( {t('title.titleBetaVersion')} )
      </span>
      }
      </h2>
      <p className={styles['heading-body']} style={styleHeadingBody}>
      {body}
      </p>
      </div>
    </MainContainer>

  )
}

export default Heading
