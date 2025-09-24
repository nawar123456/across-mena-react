import { useTranslation } from 'react-i18next';
import './Table74.css';


const Table_74 = () => {

  const {t} = useTranslation();

  return (
    <div className='parent-table'>

    <table className="table-74">
    <thead>
<tr>
<th colSpan="2">{t('tables.table74Other')}</th>

</tr>
    <tr>
    <th >{t('tables.table74Element')}</th>
    <th >{t('tables.table74PercentAllow')}</th>
    </tr>
    </thead>

<tbody>
    <tr>
    <td>{t('tables.table74Silver')}</td>
      <td>0.25</td>
    </tr>
    <tr>
    <td>{t('tables.table74Zarnik')}</td>
    <td>0.5</td>
    </tr>
    <tr>
    <td>{t('tables.table74Cadmium')}</td>
    <td>1.3</td>
    </tr>
    <tr>
    <td>{t('tables.table74OtherElemnets')}</td>
    <td>0.3</td>
    </tr>

    <tr>
    <td  colSpan="2" className='last-td'>
    {t('tables.table74OtherAre')}
      </td>
    </tr>
    </tbody>

    </table>
    </div>
  )
}

export default Table_74
