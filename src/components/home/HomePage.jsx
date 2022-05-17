import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { base_url, getFormAction } from '../../actions/accountActions';
import style from '../../css_modules/home.module.css';
import Header from '../Header';

const HomePage = () => {
  const [country, setCountry] = useState('');
  const [user, setUser] = useState('');
  const [dateFrom, setDateFrom] = useState('2021-01-20');
  const [dateTo, setDateTo] = useState('2021-01-31');
  const [users, setUsers] = useState(['wait...']);
  const [countries, setCountries] = useState(['wait...']);
  const resultFormPassedDate = useSelector(state => state.formPassed.date);
  const resultFormSuccessfullySent = useSelector(state => state.formPassed.successfullySent);
  const resultFormFailed = useSelector(state => state.formFailed.failed);
  const dispatch = useDispatch();

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };
  const handleChangeDateFrom = (event) => {
    setDateFrom(event.target.value);
  };
  const handleChangeDateTo = (event) => {
    setDateTo(event.target.value);
  };
  const handleChangeBtn = () => {
    if (!dateFrom || !dateTo||!user||!country) {
      alert('Please, select all data (country, user, dateFrom, dateTo)');
    } else {
      dispatch(getFormAction(country, user, dateFrom, dateTo));
    }
  };

  useEffect(() => {
    function fillUsers(url) {
      fetch(url)
        .then(response => response.json())
        .then(json => json.map(item => item.name))
        .then(users => {
          setUsers(users);
          localStorage.setItem('users', JSON.stringify(users));
        });
    }
    function fillCountries(url) {
      fetch(url)
        .then(response => response.json())
        .then(json => json.map(item => item.title))
        .then(countries => {
          setCountries(countries);
          localStorage.setItem('countries', JSON.stringify(countries));
        });
    }
    let users = JSON.parse(localStorage.getItem('users'));
    let countries = JSON.parse(localStorage.getItem('countries'));
    if (!users || !countries) {
      fillUsers(`${base_url}users`);
      fillCountries(`${base_url}countries`);
    } else {
      setUsers(users);
      setCountries(countries);
    }
  }, [])


  return (
    <>
      <Header />
      <Stack component="form" noValidate spacing={3}>
        <div>
          <FormControl sx={{ m: 0, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={country}
              onChange={handleChangeCountry}
              autoWidth
              label="Country"
            >
              {countries.map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 0, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-autowidth-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={user}
              onChange={handleChangeUser}
              autoWidth
              label="User"
            >
              {users.map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <TextField
          id="date"
          label="From"
          type="date"
          value={dateFrom}
          onChange={handleChangeDateFrom}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="To"
          type="date"
          value={dateTo}
          onChange={handleChangeDateTo}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <span><Button onClick={handleChangeBtn} sx={{ borderRadius: '40px', width: '100px' }} color="primary" variant="contained" >Send</Button></span>
        <div className="col-12, col-md-6">
          <Box sx={{ bgcolor: 'whitesmoke', height: '35vh', paddingTop: '10px', border: '1px solid black', overflow: 'auto', scrollBehavior: 'smooth' }}>
            <div className="container" >
              <div className="row">
                <div className="col-4">
                  <div className={style.formText}>
                    <h6>Date</h6>
                    {resultFormPassedDate.map((item, index) => <div key={index}>{item}</div>)}</div>
                </div>
                <div className="col-4">
                  <div className={style.formText}>
                    <h6>Successfully sent</h6>
                    {resultFormSuccessfullySent.map((item, index) => <div key={index}>{item}</div>)}</div>
                </div>
                <div className="col-4">
                  <div className={style.formText}>
                    <h6>Failed</h6>
                    {resultFormFailed.map((item, index) => <div key={index}>{item}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </Stack >
    </>
  )
}

export default HomePage