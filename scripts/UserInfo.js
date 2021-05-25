export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo(nameProfile, jobProfile) {
    return {
      name: nameProfile.textContent,
      job: jobProfile.textContent
    }
  }

  setUserInfo(name, job) {

  }
}
