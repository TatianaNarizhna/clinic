import React from 'react';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ISearchResponse, IResItem } from '../../types/searchTypes';
import * as dataApi from '../../services/dataApi';
import Section from '../Section/Section';
import SearchIcon from '../../svgFile/symbol-defs.svg';
import s from './Search.module.css';

const Search: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('cities');
  const [searchTextInput, setSearchTextInput] = useState<string>('');
  const [responseData, setResponseData] = useState<ISearchResponse | null>(
    null,
  );

  const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    setSelectedValue(target.value);
    console.log(target.value);

    if (searchTextInput) {
      dataApi
        .getSearchResult(target.value, searchTextInput)
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res) {
            setResponseData(res.data);
          }
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextInput(e.target.value);
    console.log(e.target.value);
  };

  const formSubmit = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    dataApi
      .getSearchResult(selectedValue, searchTextInput)
      .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
        if (res) {
          setResponseData(res.data);
        }
      });
  };

  console.log(responseData);

  return (
    <Section>
      <div>
        <form onSubmit={formSubmit}>
          <div className={s.form_container}>
            <div className={s.input_container}>
              {' '}
              <div className={s.svg_container}>
                <svg width={22} height={22}>
                  <use xlinkHref={`${SearchIcon}#icon-search`}></use>
                </svg>
              </div>{' '}
              <input
                className={s.input}
                type="search"
                name="search"
                placeholder="Enter keyword..."
                value={searchTextInput}
                onChange={handleInputChange}
              />
            </div>

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="cities"
                  control={<Radio />}
                  label="City"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="states"
                  control={<Radio />}
                  label="State"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="postcodes"
                  control={<Radio />}
                  label="Postal Code"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="names"
                  control={<Radio />}
                  label="Clinic Name"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="suburbs"
                  control={<Radio />}
                  label="Suburb"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </form>

        <div className={s.search_res}>
          <div>
            {' '}
            {responseData === null ? (
              <p>No results, please try again</p>
            ) : (
              <ul>
                {Array.isArray(responseData) &&
                  responseData.map((item, i) => (
                    <li key={i} className={s.clinic_item}>
                      <h4>{item.longName}</h4>
                      <p>{item.city}</p>
                      <p>{item.address}</p>
                      <p>{item.website}</p>
                      <p>{item.phone}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div>map</div>
        </div>
      </div>
    </Section>
  );
};

export default Search;
