export const base_url = 'http://localhost:8080/logs/';
export const PUT_FORM_PASSED = 'PUT_FORM_PASSED';
export const PUT_FORM_FAILED = 'PUT_FORM_FAILED';

export const putFormPassed = (form) => {
  return {
    type: PUT_FORM_PASSED,
    payload: form
  }
}

export const putFormFailed = (form) => {
  return {
    type: PUT_FORM_FAILED,
    payload: form
  }
}

export const getFormAction = (country, user, dateFrom, dateTo) => {
  console.log(dateFrom);
  return (dispatch) => {
    fetch(`${base_url}success/?startDate=${dateFrom}&endDate=${dateTo}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => ({
        date: (Object.keys(data)).reverse(),
        successfullySent: (Object.values(data)).reverse()
      }))
      .then(formPassedDescription => {
        dispatch(putFormPassed(formPassedDescription));
      })

      fetch(`${base_url}unsuccess/?startDate=${dateFrom}&endDate=${dateTo}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => ({
          date: (Object.keys(data)).reverse(),
          failed: (Object.values(data)).reverse()
        }))
        .then(formFailedDescription => {
          dispatch(putFormFailed(formFailedDescription));
        })
        .catch(err => console.log(err.message));
  }
}