import React from 'react';
import { AxiosResponse } from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
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
import { ChildProcess } from 'child_process';

interface ICoordinates {
  latitude: number;
  longitude: number;
}

const Search: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>('');
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

  const [city, setCity] = useState<ISearchResponse | null>(null);
  const [state, setState] = useState<ISearchResponse | null>(null);
  const [post, setPost] = useState<ISearchResponse | null>(null);
  const [name, setName] = useState<ISearchResponse | null>(null);
  const [suburb, setSuburb] = useState<ISearchResponse | null>(null);
  const [nearby, setNearby] = useState<ISearchResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const inputRef = useRef<any>(null);

  const getCoordinates = useCallback((arr: any) => {
    if (!arr || arr.length === 0) {
      setCoordinates([]);
    } else {
      arr.map((item: any) =>
        setCoordinates(prevState => [
          ...(prevState ?? []),
          { latitude: item.latitude, longitude: item.longitude },
        ]),
      );
    }
  }, []);

  const handleSearch = useCallback(
    (targetValue: string, searchInputValue: string) => {
      if (!hasSearched && searchInputValue) {
        setHasSearched(true);
      }
      const searchParams = new URLSearchParams();
      searchParams.append('target', targetValue);
      searchParams.append('query', searchInputValue);

      const newUrl = `https://clinic-gamma.vercel.app/search?${searchParams.toString()}`;
      window.history.pushState({}, '', newUrl);

      dataApi
        .getSearchResult(targetValue, searchInputValue)
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res?.data.length === 0) {
            getCoordinates(null);
            return;
          }
          if (res && res.data.length > 0 && searchInputValue) {
            getCoordinates(res.data);

            switch (targetValue) {
              case 'cities':
                setCity(res.data);

                break;
              case 'states':
                setState(res.data);

                break;
              case 'postcodes':
                setPost(res.data);

                break;
              case 'names':
                setName(res.data);

                break;
              case 'suburbs':
                setSuburb(res.data);

                break;
              case 'nearest':
                setNearby(res.data);

                break;

              default:
                break;
            }
          }
        });
    },
    [getCoordinates, hasSearched],
  );

  console.log(hasSearched);

  const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    setSelectedValue(newValue);
    // setCoordinates([]);
    setActiveRadio(true);

    if (searchTextInput && newValue !== selectedValue) {
      let stateVar;
      switch (target.value) {
        case 'cities':
          stateVar = city;
          break;
        case 'states':
          stateVar = state;
          break;
        case 'postcodes':
          stateVar = post;
          break;
        case 'names':
          stateVar = name;
          break;
        case 'suburbs':
          stateVar = suburb;
          break;
        case 'nearest':
          stateVar = nearby;
          break;
        default:
          stateVar = null;
          break;
      }

      if (!stateVar) {
        handleSearch(target.value, searchTextInput);
        setCoordinates([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextInput(e.target.value);
    setHasSearched(false);

    // setActiveRadio(true);
  };

  const formSubmit = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    // setCoordinates([]);

    if (hasSearched) {
      return;
    }

    if (selectedValue !== undefined && activeRadio) {
      handleSearch(selectedValue, searchTextInput);
      setCoordinates([]);
    }
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
                  label="Enter your request"
                  variant="outlined"
                  value={searchTextInput}
                  onChange={handleInputChange}
                  type="search"
                  name="search"
                  onBlur={handleInputBlur}
                  inputRef={inputRef}
                />
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
          <div>
            {' '}
            {coordinates === null ||
            !Array.isArray(coordinates) ||
            coordinates.length === 0 ? (
              <h4 className={s.no_results}>No results, please try again</h4>
            ) : (
              <div className={s.over}>
                {' '}
                <ul className={s.overFlow}>
                  {selectedValue === 'cities' &&
                    Array.isArray(city) &&
                    city.map((item, i) => (
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
                  {selectedValue === 'states' &&
                    Array.isArray(state) &&
                    state.map((item, i) => (
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
                  {selectedValue === 'postcodes' &&
                    Array.isArray(post) &&
                    post.map((item, i) => (
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
                  {selectedValue === 'names' &&
                    Array.isArray(name) &&
                    name.map((item, i) => (
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
                  {selectedValue === 'suburbs' &&
                    Array.isArray(suburb) &&
                    suburb.map((item, i) => (
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
                  {selectedValue === 'nearest' &&
                    Array.isArray(nearby) &&
                    nearby.map((item, i) => (
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
                        <p>{aboutClinic.email}</p>
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
