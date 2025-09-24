import { forwardRef, useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './SelectBox.module.css';
import {
  customStyle,
  CustomLoadingIndicator,
  formatLabelGoodsType,
  formatLabelMoveType,
  formatLabelContainer,
} from './Customs';
import { useTranslation } from 'react-i18next';

const SelectBoxFormSea = forwardRef(({
  typyForm, IconMobile, title, Padding, isHideTitle, styleEdit,
  Icon, placeholder, options, value, field, index, valueSelect,
  isSearch, isLoading, getSections, cursor, errorValue
}, ref) => {
  const [filteredSections, setFilteredSections] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isLoading === false && options?.length > 0 && field === "selectTypeGoods") {
      const FilterArray = options.filter(obj => obj.id !== 19 && obj.id !== 21);
      const newObj = { id: "22", label: t('labelServices.AllKindsGoods') };
      const newArray = [newObj, ...FilterArray];
      setFilteredSections(newArray);
    } else if (field === "typeMove" || field === "selectContainer") {
      setFilteredSections(options);
    } else if (field === "selectTypeGoodsChapter") {
      let arrayOptions = Object.values(options).flat();
      setFilteredSections(arrayOptions);
    }
  }, [isLoading, i18n.language, t]);

  let formatLabel;
  switch (field) {
    case 'typeMove':
      formatLabel = formatLabelMoveType;
      break;
    case 'selectTypeGoods':
    case 'selectTypeGoodsChapter':
      formatLabel = formatLabelGoodsType;
      break;
    case 'selectContainer':
      formatLabel = formatLabelContainer;
      break;
    default:
      break;
  }

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleSelectClick = () => {
    if ((isSearch && field === "selectTypeGoods") || (isSearch && field === "selectTypeGoodsChapter")) {
      setMenuIsOpen(menu => !menu);
      if (typyForm === "Sea") return;
      getSections?.();
    }
  };

  const handleClose = () => {
    if ((isSearch && field === "selectTypeGoods") || (isSearch && field === "selectTypeGoodsChapter")) {
      setMenuIsOpen(false);
    }
  };

  const handleSelect = (e) => {
    valueSelect(field, e, index);
    setMenuIsOpen(false);
  };

  return (
    <div ref={ref} className={styles['input-box']}>
      <span className={styles['input-label']} style={{ display: isHideTitle && 'none' }}>
        {title}
      </span>

      <Select
        value={value}
        placeholder={placeholder}
        formatOptionLabel={formatLabel}
        noOptionsMessage={() => t('labelDutiesCalculator.noOptions')}
        options={filteredSections}
        onChange={handleSelect}
        isClearable={true}
        styles={customStyle(IconMobile, Padding, cursor, errorValue, value, Icon)}
        menuShouldScrollIntoView={false}
        isSearchable={isSearch}
        menuIsOpen={isSearch ? menuIsOpen : undefined}
        onMenuOpen={handleSelectClick}
        onMenuClose={handleClose}
        isLoading={isLoading}
        className={styles['custom-select']}
        components={{ LoadingMessage: () => <CustomLoadingIndicator /> }}
      />

      <span className={styles['input-icon']} style={styleEdit}>
        {Icon}
      </span>
    </div>
  );
});

export default SelectBoxFormSea;
