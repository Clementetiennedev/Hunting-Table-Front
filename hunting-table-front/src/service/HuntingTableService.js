import axios from "axios";

const HuntingTableService = {
    // Fonction pour obtenir le token du localStorage
    getToken: () => {
      return localStorage.getItem('token');
    },
  
    // Fonction pour créer une instance d'axios avec le token actuel
    createAuthAxios: () => {
      const token = HuntingTableService.getToken();
  
      return axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    },
  
    // Hunt
    getHuntsForCurrentUser: function () {
      const authAxios = HuntingTableService.createAuthAxios();
      return authAxios.get('/hunts/current');
    },

    postHunt: function (title, date, description, rows) {
      const authAxios = HuntingTableService.createAuthAxios();
      return authAxios.post('/hunts/stores', {
        title: title,
        date: date,
        description: description,
        rows: rows.map(row => ({ animal: row.animal, number: row.number })),
      });
    },

    deleteHunt: function (id) {
      return axios.delete(`http://127.0.0.1:8000/api/hunt/${id}`, {

      })
    },

    getHunt: function(id) {
        return axios.get(`http://127.0.0.1:8000/api/hunt/${id}`, {

        })
    },

    //Society
    getSocieties: function() {
        return axios.get('http://127.0.0.1:8000/api/society', {

        })
    },

    getPageOfSociety: function({limit = 0, page = 1, id, name}) {
        return axios.get('http://127.0.0.1:8000/api/society', {
            params: {
                page: page,
                limit: limit,
                id: id,
                name: name,
            },
        })
    },

    getSociety: function(id) {
        return axios.get(`http://127.0.0.1:8000/api/society/${id}`, {

        })
    },

    //Federation
    getFederations: function() {
      return axios.get('http://127.0.0.1:8000/api/federation', {

      })
  },

  getFederationById: function(id) {
    return axios.get(`http://127.0.0.1:8000/api/federation/${id}`, {

    })
},

  //Season
  postQuota: function (title, dateStart, dateEnd, animal, quota) {
    const authAxios = HuntingTableService.createAuthAxios();
    return authAxios.post('/season/', {
      title: title,
      dateDebut: dateStart,
      dateFin: dateEnd,
      animal: animal,
      quota: quota
    });
  },

  getSeasonBySocietyId: function (id) {
    const authAxios = HuntingTableService.createAuthAxios();
    return authAxios.get(`/season?society_id=${id}`);
  },

  //Kill
  getKillByHuntId: function (id) {
    const authAxios = HuntingTableService.createAuthAxios();
    return authAxios.get(`/kill?hunt_id=${id}`);
  },

  //Login
    login: function({ email, password, }) {
        return axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password
        });
    },

      register: function({ email, password, confirm_password, role_id, name, description, firstName, lastName, phone, federation_id }) {
        const requestData = {
          email,
          password,
          confirm_password,
          role_id,
        };
      
        if (role_id === '3') {
          requestData.name = name;
          requestData.description = description;
          requestData.phone = phone;
          requestData.federation_id = federation_id;
        } else if (role_id === '2') {
          requestData.firstName = firstName;
          requestData.lastName = lastName;
          requestData.phone = phone;
        }
      
        return axios.post('http://127.0.0.1:8000/api/register', requestData);
      },

      logout: function() {
        const authAxios = HuntingTableService.createAuthAxios();
        return authAxios.post(`http://127.0.0.1:8000/api/logout`, {
            
        });
    },

    me: function() {
      const authAxios = HuntingTableService.createAuthAxios();
      return authAxios.get(`http://127.0.0.1:8000/api/me`, {
          
      });
  },
}

export default HuntingTableService;