import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from 'react';

import styles from '@/styles/components/form/selectPerPage.module.scss';

type Props = {
  setPerPage: Dispatch<SetStateAction<string>>;
  setActivePage: Dispatch<SetStateAction<number>>;
  perPage: string;
};

const SelectPerPage: FC<Props> = props => {
  const { setPerPage, setActivePage, perPage } = props;
  const [value, setValue] = useState<string>();

  const perPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPerPage(value);
    setActivePage(1);
  };

  useEffect(() => {
    setValue(perPage);
  }, [value, perPage]);

  return (
    <div className={styles.form__group}>
      <label htmlFor="showPer">Show per page: </label>
      <select name="showPer" value={value} id="shorPer" onChange={perPageHandler}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};

export default SelectPerPage;
