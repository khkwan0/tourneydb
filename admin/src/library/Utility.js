const Utility = {
  DeleteFromServer: async (endpoint, data) => {
    try {
      let res = await fetch(endpoint, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  PostToServer: async (endpoint, data) => {
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  GetFromServer: async endpoint => {
    try {
      let res = await fetch(endpoint, {
        methods: "GET",
        credentials: "include",
        header: {
          Accept: "application/json"
        }
      });
      return res.json();
    } catch (e) {
      throw new Error(e);
    }
  },
/*                 
  GetLocal: async key => {
    try {
      let value = await AsyncStorage.getItem(config.storage.key_prefix + key);
      return value;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  SaveLocal: async (key, value) => {
    try {
      let res = await AsyncStorage.setItem(
        config.storage.key_prefix + key,
        value
      );
      return res;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  GenerateToken: () => {
    console.log('generate token')
    try {
      let uuid = uuidv4()
      console.log('uuid', uuid)
      return uuid
    } catch(e) {
      console.log(e)
    }
  },
  getCCCustomerID: async card => {
    try {
      let ccid = AsyncStorage.getItem(config.storage.key_prefix + "ccid");
      if (ccid) {
        return { ccud: ccid, card: card };
      } else {
        throw new Error(ccid);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  GetCCToken: card => {
    return new Promise((resolve, reject) => {
      fetch(config.ccprocessor.stripe.api.endpoint + "/tokens", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + config.ccprocessor.stripe.public_key,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
          "card[number]=" +
          card.cardNumber +
          "&card[exp_month]=" +
          card.expiryMonth +
          "&card[exp_year]=" +
          card.expiryYear +
          "&card[cvc]=" +
          card.cvv
      })
        .then(res => {
          return res.json();
        })
        .then(resJson => {
          resolve(resJson);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
*/
};

export default Utility;
