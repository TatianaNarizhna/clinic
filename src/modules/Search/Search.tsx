import React from 'react';
import { AxiosResponse } from 'axios';
import { useState, useEffect, useRef, createContext } from 'react';
import { useScroll } from '@react-hooks-library/core';
import { scroller as scroll } from 'react-scroll';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  const [hasInput, setHasInput] = useState(true);

  const inputRef = useRef<any>(null);

  const scrollRef = useRef<HTMLLIElement>(null);
  // useScroll(scrollRef, ({ scrollX, scrollY }) => {
  //   console.log(scrollX);
  // });

  const params = new URLSearchParams(window.location.search);

  const updateSelectedMarker = (newData: ICoordinates) => {
    setActiveMarker(newData);
    setAboutClinic(newData);
    setActiveIndex(-1);

    const activeItem: HTMLElement | null = document.querySelector(
      `.${s.active}`,
    );

    // const itemIdString: string | null | undefined =
    //   activeItem?.getAttribute('id');
    // if (itemIdString !== null && itemIdString !== undefined) {
    //   const itemId: number = parseInt(itemIdString, 10);
    //   scroll.scrollTo(`${itemId}`, {
    //     duration: 500,
    //     delay: 100,
    //     smooth: true,
    //     offset: -70,
    //   });
    // }

    // activeItem?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    //   inline: 'nearest',
    // });

    // if (scrollRef && scrollRef.current) {
    //   scrollRef.current.scrollIntoView();
    // }
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
    setLoader(true);
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
                disabled={!searchTextInput || loader}
              >
                Search
              </button>
            </div>

            <div className={s.form_control}>
              <label htmlFor="cities" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="cities"
                  name="cities"
                  value="cities"
                  // defaultChecked
                  checked={selectedValue === 'cities'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>City</span>
              </label>
              <label htmlFor="states" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="states"
                  name="states"
                  value="states"
                  checked={selectedValue === 'states'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>State</span>
              </label>

              <label htmlFor="postcodes" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="postcodes"
                  name="postcodes"
                  value="postcodes"
                  checked={selectedValue === 'postcodes'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>Post code</span>
              </label>

              <label htmlFor="names" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="names"
                  name="names"
                  value="names"
                  checked={selectedValue === 'names'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>Name</span>
              </label>

              <label htmlFor="suburbs" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="suburbs"
                  name="suburbs"
                  value="suburbs"
                  checked={selectedValue === 'suburbs'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>Suburbs</span>
              </label>

              <label htmlFor="nearest" className={s.label_radio}>
                <input
                  className={s.input_button}
                  type="radio"
                  id="nearest"
                  name="nearest"
                  value="nearest"
                  checked={selectedValue === 'nearest'}
                  onChange={handleRadioChange}
                />{' '}
                <span className={s.check}></span>
                <span className={s.radio_name}>Nearest</span>
              </label>
            </div>
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
                          id={item.longName}
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
