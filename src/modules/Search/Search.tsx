import React from 'react';
import { AxiosResponse } from 'axios';
import { useState, useEffect, useRef } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ISearchResponse, IResItem } from '../../types/searchTypes';
import * as dataApi from '../../services/dataApi';
import Section from '../Section/Section';
import SearchIcon from '../../svgFile/symbol-defs.svg';
import MapComponent from '../Map/Map';
import s from './Search.module.css';

interface ICoordinates {
  latitude: number;
  longitude: number;
  name: string;
}

const Search: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    'cities',
  );
  const [activeRadio, setActiveRadio] = useState(false);
  const [searchTextInput, setSearchTextInput] = useState<string>('');
  const [isActiveSvg, setIsActiveSvg] = useState(false);
  const [responseData, setResponseData] = useState<ISearchResponse | null>(
    null,
  );
  const [aboutClinic, setAboutClinic] = useState<IResItem | undefined>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeButtonId, setActiveButtonId] = useState<string | null>(
    'location',
  );
  const [coordinates, setCoordinates] = useState<ICoordinates[] | undefined>(
    [],
  );
  const [loader, setLoader] = useState(false);

  const inputRef = useRef<any>(null);

  const getCoordinates = (arr: any) => {
    if (!arr || arr.length === 0) {
      setCoordinates([]);
      // setSelectedValue(undefined);
    } else {
      arr.map((item: any) =>
        setCoordinates(prevState => [
          ...(prevState ?? []),
          {
            latitude: item.latitude,
            longitude: item.longitude,
            name: item.name,
          },
        ]),
      );
    }
  };

  // console.log(selectedValue);

  const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;

    setSelectedValue(target.value);
    setCoordinates([]);
    setActiveRadio(true);

    // if (searchTextInput) {
    //   dataApi
    //     .getSearchResult(target.value, searchTextInput)
    //     .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
    //       if (res && res.data.length > 0) {
    //         setResponseData(res.data);
    //         getCoordinates(res.data);
    //         // setActiveRadio(true);
    //       }
    //     });
    // }
  };

  const handleSvgClick = () => {
    setIsActiveSvg(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputBlur = () => {
    setIsActiveSvg(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextInput(e.target.value);
    setActiveRadio(true);
  };

  const formSubmit = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    setCoordinates([]);

    // console.log(selectedValue);
    // console.log(activeRadio);

    if (selectedValue !== undefined && activeRadio) {
      dataApi
        .getSearchResult(selectedValue, searchTextInput)
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res) {
            setResponseData(res.data);
            getCoordinates(res.data);

            // console.log(res.data);
          }
          setLoader(false);
          if (res?.data.length === 0) {
            getCoordinates(null);
          }
        });
    }
    setLoader(true);
  };

  const onClearBtnClick = () => {
    setSearchTextInput('');
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

  // console.log(aboutClinic);

  return (
    <Section>
      <div className={s.media}>
        <form onSubmit={formSubmit}>
          <div className={s.form_container}>
            <div className={s.input_container} onClick={handleSvgClick}>
              {' '}
              <div className={s.svg_container}>
                <svg
                  width={22}
                  height={22}
                  fill={isActiveSvg ? 'DarkTurquoise' : 'gray'}
                >
                  <use xlinkHref={`${SearchIcon}#icon-search`}></use>
                </svg>
              </div>{' '}
              <div className={s.input_cont}>
                <TextField
                  className={s.input}
                  id="outlined-basic"
                  // label="Enter your request"
                  variant="outlined"
                  value={searchTextInput}
                  onChange={handleInputChange}
                  type="search"
                  name="search"
                  onBlur={handleInputBlur}
                  inputRef={inputRef}
                />
                <div className={s.clear_icon} onClick={onClearBtnClick}>
                  <svg width={20} height={20} fill="blue">
                    <use xlinkHref={`${SearchIcon}#icon-cross`}></use>
                  </svg>
                </div>
              </div>
              <button className={s.button_search} type="submit">
                Search
              </button>
            </div>

            <FormControl className={s.form_control}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="cities"
                  control={<Radio checked={selectedValue === 'cities'} />}
                  // defaultChecked
                  label="City"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="states"
                  control={<Radio checked={selectedValue === 'states'} />}
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
                <FormControlLabel
                  value="nearest"
                  control={<Radio />}
                  label="Nearby"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </form>

        <div className={s.search_res}>
          {loader && <p className={s.no_results}>Loading information...</p>}
          {!loader && (
            <div>
              {' '}
              {responseData === null ||
              !Array.isArray(responseData) ||
              responseData.length === 0 ? (
                <h4 className={s.no_results}>No results, please try again</h4>
              ) : (
                <div className={s.over}>
                  {' '}
                  <ul className={s.overFlow}>
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
                          <p>
                            {item.city}, {item.address}
                          </p>
                          <div className={s.clinic_list}>
                            <p>{item.website}</p>
                            <p>p. {item.phone}</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className={s.lam_relative}>
            <div className={s.lambda}>
              <svg width={55} height={55}>
                <use
                  xlinkHref={`${SearchIcon}#icon-Orange-Lambda-2016022849`}
                ></use>
              </svg>
            </div>
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
                {aboutClinic ? (
                  <>
                    <h4 className={s.about_title}>{aboutClinic.longName}</h4>
                    <div className={s.about_desc}>
                      <div>
                        <p>{aboutClinic.suburb}</p>
                        <p>{aboutClinic.state}</p>
                      </div>
                      <div>
                        <a
                          href="mailto:{aboutClinic.email}"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {aboutClinic.email}
                        </a>
                      </div>
                    </div>
                    <p>{aboutClinic.about}</p>
                  </>
                ) : (
                  <h3 className={s.select_clinic}>Please, select a clinic!</h3>
                )}
              </div>
            )}
            {activeButtonId === 'location' ? (
              <div>
                <MapComponent coordinates={coordinates} dataRes={aboutClinic} />
              </div>
            ) : (
              <div>
                <MapComponent coordinates={coordinates} dataRes={aboutClinic} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Search;
