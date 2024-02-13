import Dexie from "dexie";

export class IDB extends Dexie {
  constructor() {
    super("idb");

    this.version(1).stores({
      messages: "&_id,roomid,sender_id,sender_nickname,content,createdAt",
      countries: "++id,lang,iso2",
    });

    this.messages = this.table("messages");
    this.countries = this.table("countries");

    this.on("versionchange", function (event) {
      console.log("versionchange", event);
    });
  }

  async getMessages(byroom) {
    return await this.messages
      .filter((msg) => msg.roomid == byroom)
      .sortBy("createdAt");
  }

  async searchMessage(room, keyword) {
    return await this.messages
      .filter((msg) => {
        if (msg.roomid == room) {
          return (
            msg.sender_nickname.indexOf(keyword) != -1 ||
            msg.content.indexOf(keyword) != -1
          );
        }
      })
      .sortBy("createdAt");
  }

  updateMessage(id, obj) {
    return this.messages.update(id, obj);
  }

  createMessage(msg) {
    return this.messages.put(msg);
  }

  deleteMessage(mid) {
    return this.messages.delete(mid);
  }

  syncCountries(items) {
    return this.countries.bulkAdd(items);
  }

  async getCountries(locale, phoneCode, timeZone) {
    let countries = await this.countries
      .filter((country) => country.lang == locale)
      .toArray();
    if (countries && countries.length > 0) {
      let results = countries.map((element) => {
        let res = {};
        if (phoneCode) {
          if (element.phone_code.indexOf("+") > 0) {
            res.label = element.phone_code + " " + element.name;
          } else {
            res.label = "+" + element.phone_code + " " + element.name;
          }
          res.value = element.phone_code;
        } else if (timeZone) {
          res.label = element.name;
          res.value = element.iso2;
          res.timezones = element.timezones;
        } else {
          res.label = element.name;
          res.value = element.iso2;
          res.emoji = element.emoji;
        }

        return res;
      });
      return results;
    } else {
      return [];
    }
  }

  async getCities(country, locale) {
    let cities = [];
    if (!!country && !!locale) {
      let cty = await this.countries
        .filter((c) => c.lang == locale && c.iso2 == country)
        .toArray();
      if (cty && cty.length > 0) {
        cities = cty[0].cities;
        if (typeof cities == "string") cities = JSON.parse(cities);
      }
    }
    return cities;
  }

  async getCityName(country, locale, cityValues) {
    if (!cityValues || cityValues.length == 0) return "";
    let names = [];
    let values = cityValues.split(",");
    let cities = await this.getCities(country, locale);
    if (cities && cities.length > 0) {
      cities.forEach((item) => {
        values.forEach((element) => {
          if (item.value === element) names.push(item.label);
        });
      });
    }
    if (names.length > 0) return names.join(", ");
    return "";
  }
}

export const indexDB = new IDB();
