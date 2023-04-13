import React from 'react';
import { AxiosResponse } from 'axios';
import {
  useState,
  useEffect,
  useRef,
  createContext,
  useLayoutEffect,
} from 'react';
import { useScroll } from '@react-hooks-library/core';
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

interface ICoordinates {
  latitude: number;
  longitude: number;
  longName: string;
  suburb: string;
  state: string;
  email: string;
  about: string;
}

interface MyContextValue {
  activeMarker: ICoordinates;
  updateSelectedMarker: (newData: any) => void;
}

export const MyContext = createContext<MyContextValue>({
  activeMarker: {
    latitude: 0,
    longitude: 0,
    longName: '',
    suburb: '',
    state: '',
    email: '',
    about: '',
  },
  updateSelectedMarker: () => {},
});

const Search: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    'cities',
  );
  const [activeRadio, setActiveRadio] = useState(true);
  const [searchTextInput, setSearchTextInput] = useState<string>('');
  const [isActiveSvg, setIsActiveSvg] = useState(false);
  const [responseData, setResponseData] = useState<ISearchResponse | null>(
    null,
  );
  const [aboutClinic, setAboutClinic] = useState<any | undefined>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeButtonId, setActiveButtonId] = useState<string | null>(
    'location',
  );
  const [coordinates, setCoordinates] = useState<ICoordinates[] | undefined>(
    [],
  );
  const [loader, setLoader] = useState(false);
  const [activeMarker, setActiveMarker] = useState<ICoordinates>({
    latitude: 0,
    longitude: 0,
    longName: '',
    suburb: '',
    state: '',
    email: '',
    about: '',
  });

  // const updateSelectedMarker = (newData: ICoordinates) => {
  //   setActiveMarker(newData);
  //   setAboutClinic(newData);
  //   setActiveIndex(-1);

  //   if (scrollRef.current) {
  //     scrollTo({
  //       top: scrollRef.current.scrollTop + newData.latitude,
  //       left: scrollRef.current.scrollLeft + newData.longitude,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  const [hasInput, setHasInput] = useState(true);

  const inputRef = useRef<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  useScroll(scrollRef, ({ scrollX, scrollY }) => {
    console.log(scrollX);
  });

  const params = new URLSearchParams(window.location.search);

  const updateSelectedMarker = (newData: ICoordinates) => {
    setActiveMarker(newData);
    setAboutClinic(newData);
    setActiveIndex(-1);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get('value');
    const search = searchParams.get('search');
    // setHasInput(false);
    // setActiveRadio(true);

    if (value && search) {
      dataApi
        .getSearchResult(value, search)
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res) {
            setResponseData(res.data);
            getCoordinates(res.data);
            setSearchTextInput(search);
            setSelectedValue(value);
            setActiveRadio(true);
            setHasInput(false);
            // setHasInput(false);
          }
          setLoader(false);
          if (res?.data.length === 0) {
            getCoordinates(null);
          }
        });
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get('value');
    const search = searchParams.get('search');
    if (!value && !search) {
      dataApi
        .getAllClinics()
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res) {
            console.log('has');
            console.log(hasInput);
            setResponseData(res.data);
            getCoordinates(res.data);
            setActiveRadio(true);
          }
          setLoader(false);
          if (res?.data.length === 0) {
            getCoordinates(null);
          }
        });
    }
  }, []);

  const getCoordinates = (arr: any) => {
    arr.map((item: any) =>
      setCoordinates(prevState => [
        ...(prevState ?? []),
        {
          latitude: item.latitude,
          longitude: item.longitude,
          longName: item.longName,
          suburb: item.suburb,
          state: item.state,
          email: item.email,
          about: item.about,
        },
      ]),
    );
  };

  const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;

    setSelectedValue(target.value);
    setActiveRadio(true);
    // setCoordinates([]);
    // setActiveRadio(true);
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

    if (searchTextInput === '') {
      return;
    }

    if (selectedValue !== undefined && activeRadio) {
      dataApi
        .getSearchResult(selectedValue, searchTextInput)
        .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
          if (res) {
            setResponseData(res.data);
            setActiveRadio(true);
            getCoordinates(res.data);
            // setHasInput(true);
            params.set('value', selectedValue);
            params.set('search', searchTextInput);
            const newUrl = window.location.pathname + '?' + params.toString();
            window.history.pushState({}, '', newUrl);
          }
          setLoader(false);
          if (res?.data.length === 0) {
            // getCoordinates(null);
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
    setActiveMarker({
      latitude: 0,
      longitude: 0,
      longName: '',
      suburb: '',
      state: '',
      email: '',
      about: '',
    });
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButtonId(e.currentTarget.id);
  };

  const activeBtnColor = (bottonId: string) => {
    return bottonId === activeButtonId ? `${s.button} ${s.active}` : s.button;
  };

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
                <input
                  className={s.input}
                  type="search"
                  name="search"
                  value={searchTextInput}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  // inputRef={inputRef}
                />
                <div className={s.clear_icon} onClick={onClearBtnClick}>
                  <svg width={20} height={20} fill="blue">
                    <use xlinkHref={`${SearchIcon}#icon-cross`}></use>
                  </svg>
                </div>
              </div>
              <button
                className={s.button_search}
                type="submit"
                disabled={loader}
              >
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
                  control={<Radio checked={selectedValue === 'postcodes'} />}
                  label="Postal Code"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="names"
                  control={<Radio checked={selectedValue === 'names'} />}
                  label="Clinic Name"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="suburbs"
                  control={<Radio checked={selectedValue === 'suburbs'} />}
                  label="Suburb"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="nearest"
                  control={<Radio checked={selectedValue === 'nearest'} />}
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
                <div className={s.over} ref={scrollRef}>
                  {' '}
                  <ul className={s.overFlow}>
                    {Array.isArray(responseData) &&
                      responseData.map((item, i) => (
                        <li
                          key={i}
                          className={`${s.clinic_item} ${
                            activeIndex === i ? s.active : ''
                          } ${
                            activeMarker?.longName === item.longName
                              ? s.active
                              : ''
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
                            <a href={item.website}>{item.website}</a>
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
            <MyContext.Provider value={{ activeMarker, updateSelectedMarker }}>
              {activeButtonId === 'location' ? (
                <div>
                  <MapComponent
                    coordinates={coordinates}
                    dataRes={aboutClinic}
                    activeIndex={activeIndex}
                  />
                </div>
              ) : (
                <div>
                  <MapComponent
                    coordinates={coordinates}
                    dataRes={aboutClinic}
                    activeIndex={activeIndex}
                  />
                </div>
              )}
            </MyContext.Provider>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Search;
