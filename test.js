// import React from 'react';
// import { AxiosResponse } from 'axios';
// import { useState, useEffect, useRef } from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import { ISearchResponse, IResItem } from '../../types/searchTypes';
// import * as dataApi from '../../services/dataApi';
// import Section from '../Section/Section';
// import SearchIcon from '../../svgFile/symbol-defs.svg';
// import MapComponent from '../Map/Map';
// import s from './Search.module.css';

// interface ICoordinates {
//   latitude: number;
//   longitude: number;
// }

// const Search: React.FC = () => {
//   const [selectedValue, setSelectedValue] = useState<string | undefined>(
//     'cities',
//   );
//   const [activeRadio, setActiveRadio] = useState(false);
//   const [searchTextInput, setSearchTextInput] = useState<string>('');
//   const [isActiveSvg, setIsActiveSvg] = useState(false);
//   const [responseData, setResponseData] = useState<ISearchResponse | null>(
//     null,
//   );
//   const [aboutClinic, setAboutClinic] = useState<IResItem | undefined>();
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const [activeButtonId, setActiveButtonId] = useState<string | null>(
//     'location',
//   );
//   const [coordinates, setCoordinates] = useState<ICoordinates[] | undefined>(
//     [],
//   );

//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [post, setPost] = useState('');
//   const [name, setName] = useState('');
//   const [suburb, setSuburb] = useState('');
//   const [nearby, setNearby] = useState('');

//   const inputRef = useRef<any>(null);

//   const getCoordinates = (arr: any) => {
//     if (!arr || arr.length === 0) {
//       setCoordinates([]);
//       // setSelectedValue(undefined);
//     } else {
//       arr.map((item: any) =>
//         setCoordinates(prevState => [
//           ...(prevState ?? []),
//           { latitude: item.latitude, longitude: item.longitude },
//         ]),
//       );
//     }
//   };

//   console.log(selectedValue);

//   const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
//     const target = event.target as HTMLInputElement;

//     // const queryString = `/clinics/${selectedValue}/${encodeURIComponent(
//     //   searchTextInput,
//     // )}`;

//     // window.history.pushState(null, '', queryString);

//     setSelectedValue(target.value);
//     setCoordinates([]);
//     setActiveRadio(true);

//     if (searchTextInput) {
//       dataApi
//         .getSearchResult(target.value, searchTextInput)
//         .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
//           if (res && res.data.length > 0) {
//             setResponseData(res.data);
//             getCoordinates(res.data);
//             // setActiveRadio(true);
//           }
//         });
//     }
//   };

//   const handleSvgClick = () => {
//     setIsActiveSvg(true);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleInputBlur = () => {
//     setIsActiveSvg(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTextInput(e.target.value);
//     // setActiveRadio(true);
//   };

//   const formSubmit = (e: React.ChangeEvent<unknown>) => {
//     e.preventDefault();
//     setCoordinates([]);

//     // const queryString = `?search=${encodeURIComponent(
//     //   searchTextInput,
//     // )}&type=${selectedValue}`;

//     // window.history.pushState(null, '', queryString);

//     if (selectedValue !== undefined && activeRadio) {
//       dataApi
//         .getSearchResult(selectedValue, searchTextInput)
//         .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
//           if (res) {
//             setResponseData(res.data);
//             getCoordinates(res.data);

//             // console.log(res.data);
//           }
//           if (res?.data.length === 0) {
//             getCoordinates(null);
//           }
//         });
//     }
//   };

//   const onClinicClick = (item: IResItem, index: number) => {
//     setAboutClinic(item);
//     setActiveIndex(index);
//   };

//   const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     setActiveButtonId(e.currentTarget.id);
//   };

//   const activeBtnColor = (bottonId: string) => {
//     return bottonId === activeButtonId ? `${s.button} ${s.active}` : s.button;
//   };

//   // console.log(aboutClinic);

//   return (
//     <Section>
//       <div className={s.media}>
//         <form onSubmit={formSubmit}>
//           <div className={s.form_container}>
//             <div className={s.input_container} onClick={handleSvgClick}>
//               {' '}
//               <div className={s.svg_container}>
//                 <svg
//                   width={22}
//                   height={22}
//                   fill={isActiveSvg ? 'DarkTurquoise' : 'gray'}
//                 >
//                   <use xlinkHref={`${SearchIcon}#icon-search`}></use>
//                 </svg>
//               </div>{' '}
//               <div className={s.input_cont}>
//                 <TextField
//                   className={s.input}
//                   id="outlined-basic"
//                   label="Enter your request"
//                   variant="outlined"
//                   value={searchTextInput}
//                   onChange={handleInputChange}
//                   type="search"
//                   name="search"
//                   onBlur={handleInputBlur}
//                   inputRef={inputRef}
//                 />
//               </div>
//               <button className={s.button_search} type="submit">
//                 Search
//               </button>
//             </div>

//             <FormControl className={s.form_control}>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-row-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//               >
//                 <FormControlLabel
//                   value="cities"
//                   control={<Radio />}
//                   label="City"
//                   onChange={handleRadioChange}
//                 />
//                 <FormControlLabel
//                   value="states"
//                   control={<Radio />}
//                   label="State"
//                   onChange={handleRadioChange}
//                 />
//                 <FormControlLabel
//                   value="postcodes"
//                   control={<Radio />}
//                   label="Postal Code"
//                   onChange={handleRadioChange}
//                 />
//                 <FormControlLabel
//                   value="names"
//                   control={<Radio />}
//                   label="Clinic Name"
//                   onChange={handleRadioChange}
//                 />
//                 <FormControlLabel
//                   value="suburbs"
//                   control={<Radio />}
//                   label="Suburb"
//                   onChange={handleRadioChange}
//                 />
//                 <FormControlLabel
//                   value="nearest"
//                   control={<Radio />}
//                   label="Nearby"
//                   onChange={handleRadioChange}
//                 />
//               </RadioGroup>
//             </FormControl>
//           </div>
//         </form>

//         <div className={s.search_res}>
//           <div>
//             {' '}
//             {responseData === null ||
//             !Array.isArray(responseData) ||
//             responseData.length === 0 ? (
//               <h4 className={s.no_results}>No results, please try again</h4>
//             ) : (
//               <div className={s.over}>
//                 {' '}
//                 <ul className={s.overFlow}>
//                   {Array.isArray(responseData) &&
//                     responseData.map((item, i) => (
//                       <li
//                         key={i}
//                         className={`${s.clinic_item} ${
//                           activeIndex === i ? s.active : ''
//                         }`}
//                         onClick={() => {
//                           onClinicClick(item, i);
//                         }}
//                       >
//                         <h4>{item.longName}</h4>
//                         <p>
//                           {item.city}, {item.address}
//                         </p>
//                         <div className={s.clinic_list}>
//                           <p>{item.website}</p>
//                           <p>p. {item.phone}</p>
//                         </div>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className={s.lam_relative}>
//             <div className={s.lambda}>
//               <svg width={55} height={55}>
//                 <use
//                   xlinkHref={`${SearchIcon}#icon-Orange-Lambda-2016022849`}
//                 ></use>
//               </svg>
//             </div>
//             <div className={s.map_button}>
//               <button
//                 id="location"
//                 type="button"
//                 onClick={handleBtnClick}
//                 className={activeBtnColor('location')}
//               >
//                 Location
//               </button>
//               <button
//                 id="about"
//                 type="button"
//                 className={activeBtnColor('about')}
//                 onClick={handleBtnClick}
//               >
//                 About Clinic
//               </button>
//             </div>
//             {activeButtonId === 'about' && (
//               <div className={s.about_clinic}>
//                 {aboutClinic ? (
//                   <>
//                     <h4 className={s.about_title}>{aboutClinic.longName}</h4>
//                     <div className={s.about_desc}>
//                       <div>
//                         <p>{aboutClinic.suburb}</p>
//                         <p>{aboutClinic.state}</p>
//                       </div>
//                       <div>
//                         <p>{aboutClinic.email}</p>
//                       </div>
//                     </div>
//                     <p>{aboutClinic.about}</p>
//                   </>
//                 ) : (
//                   <h3 className={s.select_clinic}>Please, select a clinic!</h3>
//                 )}
//               </div>
//             )}
//             {activeButtonId === 'location' ? (
//               <div>
//                 <MapComponent coordinates={coordinates} dataRes={aboutClinic} />
//               </div>
//             ) : (
//               <div>
//                 <MapComponent coordinates={coordinates} dataRes={aboutClinic} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default Search;

// -----
// const queryString = `/clinics/${selectedValue}/${encodeURIComponent(
//   searchTextInput,
// )}`;

// window.history.pushState(null, '', queryString);

// ----------
// const MyForm = () => {
//   const [selectedValue, setSelectedValue] = useState('');
//   const [activeRadio, setActiveRadio] = useState(false);
//   const [searchTextInput, setSearchTextInput] = useState('');
//   const [disableSubmit, setDisableSubmit] = useState(false);
//   const formRef = useRef(null);

//   const handleRadioChange = (event: React.SyntheticEvent<Element, Event>) => {
//     const target = event.target as HTMLInputElement;
//     const newValue = target.value;
//     setSelectedValue(newValue);
//     setActiveRadio(true);
//     console.log(newValue);

//     if (searchTextInput && newValue !== selectedValue) {
//       // ... your existing code ...

//       if (!stateVar) {
//         dataApi
//           .getSearchResult(target.value, searchTextInput)
//           .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
//             if (res && res.data.length > 0) {
//               // ... your existing code ...
//               setActiveRadio(true);
//               setDisableSubmit(false); // enable submit button
//             }
//           });
//       }
//       else {
//         setDisableSubmit(false); // enable submit button
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTextInput(e.target.value);
//   };

//   const formSubmit = (e: React.ChangeEvent<unknown>) => {
//     e.preventDefault();
//     setCoordinates([]);
//     console.log('2');

//     if (selectedValue !== undefined && activeRadio) {
//       console.log('hhh');
//       setDisableSubmit(true); // disable submit button
//       handleSearch(selectedValue, searchTextInput);
//     }
//   };

//   return (
//     <form onSubmit={formSubmit} ref={formRef}>
//       <label htmlFor="cities">
//         <input type="radio" id="cities" name="searchOption" value="cities" onChange={handleRadioChange} />
//         Cities
//       </label>
//       {/* ... other radio buttons ... */}
//       <input type="text" onChange={handleInputChange} />
//       <button type="submit" disabled={disableSubmit}>Search</button>
//     </form>
//   );

// ---------------------------------------
// const [searchedAddresses, setSearchedAddresses] = useState<{ [key: string]: boolean }>({});

// const handleSearch = useCallback(
//   (targetValue: string, searchInputValue: string) => {
//     if (searchedAddresses[searchInputValue]) {
//       return;
//     }
//     dataApi
//       .getSearchResult(targetValue, searchInputValue)
//       .then((res: AxiosResponse<ISearchResponse, any> | undefined) => {
//         if (res?.data.length === 0) {
//           getCoordinates(null);
//           return;
//         }
//         if (res && res.data.length > 0 && searchInputValue) {
//           getCoordinates(res.data);

//           switch (targetValue) {
//             case 'cities':
//               setCity(res.data);
//               setSearchResult(res.data);
//               break;
//             case 'states':
//               setState(res.data);
//               setSearchResult(res.data);
//               break;
//             case 'postcodes':
//               setPost(res.data);
//               setSearchResult(res.data);
//               break;
//             case 'names':
//               setName(res.data);
//               setSearchResult(res.data);
//               break;
//             case 'suburbs':
//               setSuburb(res.data);
//               setSearchResult(res.data);
//               break;
//             case 'nearest':
//               setNearby(res.data);
//               setSearchResult(res.data);
//               break;

//             default:
//               break;
//           }

//           setSearchedAddresses((prev) => ({
//             ...prev,
//             [searchInputValue]: true,
//           }));
//         }
//       });
//   },
//   [getCoordinates, searchedAddresses],
// );
