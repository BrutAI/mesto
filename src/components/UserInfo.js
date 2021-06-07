export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo(nameProfile, jobProfile) {
    return {
      name: nameProfile.textContent,
      about: jobProfile.textContent
    }
  }

  setUserInfo({ name, about, avatar }) {
    console.log(name, about);
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }
}
