export default class Api {
  constructor(token, baseUrl) {
    this._token = token;
    this._baseUrl = baseUrl; //not using yet
  }
  fetchData(url) {
    return fetch(url, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        if (result.ok) { return result.json(); }
        else { return Promise.reject(`Ошибка: ${result.status}`); }
      })
      .then((result) => {
        return result
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editProfile(url, name, about) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
      .catch((err) => { console.log(err) });
  }

    postCard(url,name, link){
      fetch(url, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${name}`,
          link: `${link}`
        })
      })
        .catch((err) => { console.log(err) });
    }

  deleteCard(url){
    fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .catch((err) => { console.log(err) });
  }
  likeCard(cardUrl, cardId, likes, idOnServer){
    let methodValue;
    const hasLike = (element) => element._id===idOnServer;
    let isLiked;
    if(likes){ isLiked = likes.some(hasLike);} else{ isLiked = false;}
    if(isLiked){ methodValue = 'DELETE'} else {methodValue = 'PUT'}
    fetch(`${cardUrl}/likes/${cardId}`, {
      method: methodValue,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .catch((err) => { console.log(err) });
  }
  isLiked(){
    const hasLike = (element) => element._id===idOnServer;
    let isLiked = likes.some(hasLike);
  }
  updateAvatar(userInfoUrl,link){
   return fetch(`${userInfoUrl}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
    .then((result) =>  result.json())
    .then((result) => {return result})
      .catch((err) => { console.log(err) });
  }

}
