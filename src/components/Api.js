export default class Api {
  constructor(token, baseUrl) {
    this._token = token;
    this._baseUrl = baseUrl;
  }
   fetchData(url) {
    return fetch(url, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((result) =>{ if (result.ok)
         {return result.json();}
         else  {return Promise.reject(`Ошибка: ${result.status}`);}
                    })
      .then((result) => {

        //return result
         console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards(url) {
    return fetch(url, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((result) =>{ if (result.ok)
         {return result.json();}
         else  {return Promise.reject(`Ошибка: ${result.status}`);}
                    })
      .then((result) => {

        //return result
         console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }


}
