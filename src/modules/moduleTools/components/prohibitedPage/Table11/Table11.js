import { useTranslation } from 'react-i18next';
import './Table11.css';


const Table11 = () => {
  const {t} = useTranslation();

return (
    <div className='parent-table11'>
    <table className="table-11">

    <thead>
      <tr>
      <th colSpan="2">{t('tables.table11Passage')}</th>
      <th rowSpan="2">{t('tables.table11Ash')}</th>
      <th rowSpan="2">{t('tables.table11Starch')}</th>
      <th rowSpan="2">{t('tables.table11Cereals')}</th>
      </tr>

    <tr>
    <th >{t('tables.table11Micro')}</th>
    <th >{t('tables.table11Micro2')}</th>
    </tr>
    
    </thead>

    <tbody>

    <tr>
    <td>_</td>
    <td>80%</td>
    <td>2.50%</td>
    <td>45%</td>
    <td>{t('tables.table11Rye')}</td>
    </tr>

    <tr>
    <td>_</td>
    <td>80%</td>
    <td>3%</td>
    <td>45%</td>
    <td>{t('tables.table11Barly')}</td>
    </tr>
    
    <tr>
    <td>_</td>
    <td>80%</td>
    <td>5%</td>
    <td>45%</td>
    <td>{t('tables.table11Oats')}</td>
    </tr>

    <tr>
    <td>90%</td>
    <td>_</td>
    <td>2%</td>
    <td>45%</td>
    <td>{t('tables.table11Corn')}</td>
    </tr>

    <tr>
    <td>_</td>
    <td>80%</td>
    <td>1.60%</td>
    <td>45%</td>
    <td>{t('tables.table11Rice')}</td>
    </tr>

    <tr>
    <td>_</td>
    <td>80%</td>
    <td>4%</td>
    <td>45%</td>
    <td>{t('tables.table11Buck')}</td>
    </tr>

    </tbody>

    </table>
    
    </div>
)
}

export default Table11
