import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Section from '../Section/Section';
import s from './Search.module.css';

const Search: React.FC = () => {
  return (
    <Section>
      <div>
        <form action="">
          <div className={s.form_container}>
            {' '}
            <input
              className={s.input}
              type="search"
              name="search"
              placeholder="Enter keyword..."
              //   value={}
              //   onChange={}
            />
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="City"
                  control={<Radio />}
                  label="City"
                />
                <FormControlLabel
                  value="State"
                  control={<Radio />}
                  label="State"
                />
                <FormControlLabel
                  value="PostalCode"
                  control={<Radio />}
                  label="Postal Code"
                />
                <FormControlLabel
                  value="ClinicName"
                  control={<Radio />}
                  label="Clinic Name"
                />
                <FormControlLabel
                  value="Suburb"
                  control={<Radio />}
                  label="Suburb"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Search;
