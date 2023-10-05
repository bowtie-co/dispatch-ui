import React, { useCallback } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

export const AdminPostsSearch = (props) => {
  const { allRows, setRows, setCount } = props;

  const doSearch = useCallback((search) => {
    const hasString = (str, val) => str && str.trim().toLowerCase().indexOf(val.trim().toLowerCase()) > -1;

    const newRows = allRows.filter((row) => {
      // TODO: Better refactor for more thorough search fields?
      return search.trim() === '' || hasString(row.owner.name, search) || hasString(row.owner.email, search);
    });

    setRows(newRows);

    if (typeof setCount === 'function') {
      setCount(newRows.length);
    }
  }, [allRows, setRows, setCount]);

  return (
    <div className={'AdminPostsSearch'}>
      <InputGroup>
        <Input placeholder='Search...' onChange={(e) => doSearch(e.target.value)} />
        <InputGroupAddon addonType='append'>
          <InputGroupText>
            <i className='fas fa-search' />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};