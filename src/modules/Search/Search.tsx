import React from 'react';
import { AxiosResponse } from 'axios';
import { useState, MouseEventHandler } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ISearchResponse, IResItem } from '../../types/searchTypes';
import * as dataApi from '../../services/dataApi';
import Section from '../Section/Section';
import SearchIcon from '../../svgFile/symbol-defs.svg';
import MapComponent from '../Map/Map';
import s from './Search.module.css';

interface IItemClinic {
  item: IResItem;
}

const Search: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('cities');
  const [searchTextInput, setSearchTextInput] = useState<string>('');
  const [responseData, setResponseData] = useState<ISearchResponse | null>(
    null,
  );
  const [aboutClinic, setAboutClinic] = useState<IResItem | undefined>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeButtonId, setActiveButtonId] = useState<string | null>(
    'location',
  );

  const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    setSelectedValue(target.value);
    // console.log(target.value);

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
    // console.log(e.target.value);
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

  const onClinicClick = (item: IResItem, index: number) => {
    setAboutClinic(item);
    setActiveIndex(index);
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButtonId(e.currentTarget.id);
  };

  const activeBtnColor = (bottonId: string) => {
    return bottonId === activeButtonId ? `${s.button} ${s.active}` : s.button;
  };
  console.log(aboutClinic);

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
                    <li
                      key={i}
                      className={`${s.clinic_item} ${
                        activeIndex === i ? s.active : ''
                      }`}
                      onClick={() => {
                        onClinicClick(item, i);
                      }}
                    >
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

          <div>
            <div className={s.map_button}>
              <button
                id="location"
                type="button"
                onClick={handleBtnClick}
                className={activeBtnColor('location')}
              >
                Location
              </button>
              <button
                id="about"
                type="button"
                className={activeBtnColor('about')}
                onClick={handleBtnClick}
              >
                About Clinic
              </button>
            </div>

            {activeButtonId === 'about' && (
              <div className={s.about_clinic}>
                {aboutClinic && (
                  <>
                    <h4>{aboutClinic.longName}</h4>
                    <p>{aboutClinic.suburb}</p>
                    <p>{aboutClinic.state}</p>
                    <p>{aboutClinic.email}</p>
                    <p>{aboutClinic.about}</p>
                  </>
                )}
              </div>
            )}

            {activeButtonId === 'location' && (
              <div>
                <MapComponent />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Search;
