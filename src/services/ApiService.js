export default class ApiService {
  constructor() {
    this._apiBase = "http://localhost:3000/";
  }

  param(obj) {
    let str = [];
    for (let p in obj) {
      if (obj[p]) {
        str.push(p + "=" + obj[p]);
      }
    }
    return str.join("&");
  }

  makeUrl(url, filter) {
    const strFilter = this.param(filter);

    let resUrl = `${this._apiBase}${url}`;
    if (strFilter !== "") {
      resUrl += "?" + strFilter;
    }

    return resUrl;
  }

  async getResource(url, filter = {}) {
    const resUrl = this.makeUrl(url, filter);

    const res = await fetch(resUrl);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    let data = await res.json();

    return data;
  }

  async postResource(url, data) {
    const resUrl = this.makeUrl(url);

    const res = await fetch(resUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Could not post ${url}, received ${res.status}`);
    }
    let resdata = await res.json();

    return resdata;
  }

  async putResource(url, data) {
    const resUrl = this.makeUrl(url);

    const res = await fetch(resUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`Could not put ${url}, received ${res.status}`);
    }
    let resdata = await res.json();

    return resdata;
  }

  async deleteResource(url) {
    const resUrl = this.makeUrl(url, {});

    const res = await fetch(resUrl, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error(`Could not delete ${url}, received ${res.status}`);
    }

    return res;
  }

  async annuitiesPost(data) {
    const res = await this.postResource(`api/annuities`, data);
    return this._transformAnnuities(res);
  }

  _transformAnnuities = data => {
    return {
      amount: Number(data.amount),
      duration: Number(data.duration),
      monthlyInstallment: Number(data.monthlyInstallment)
    };
  };
}
