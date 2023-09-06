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
  totalUsers: number;
};

const SelectPerPage: FC<Props> = props => {
  const { setPerPage, setActivePage, perPage, totalUsers } = props;
  const [value, setValue] = useState<string>();

  const perPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPerPage(value);
    setActivePage(1);
  };

  const options = [5, 10, 25, 50, 100].filter(option => option <= totalUsers);

  useEffect(() => {
    setValue(perPage);
  }, [value, perPage]);

  return (
    <div className={styles.form__group}>
      <label htmlFor="showPer">Show per page: </label>
      <select name="showPer" value={value} id="shorPer" onChange={perPageHandler}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPerPage;
