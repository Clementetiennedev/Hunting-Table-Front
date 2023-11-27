import axios from "axios";

const HuntingTableService = {
    // Fonction pour obtenir le token du localStorage
    getToken: () => {
        console.log(localStorage.getItem('token'))
      return localStorage.getItem('token');
    },
  
    // Fonction pour créer une instance d'axios avec le token actuel
    createAuthAxios: () => {
      const token = HuntingTableService.getToken();
      console.log('Token au moment de la création de l\'instance:', token);
  
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

    poststore: function (title, date, description, rows) {
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


    getHunts: function() {
        return axios.get('http://127.0.0.1:8000/api/hunt', {

        })
    },

    getPageOfHunt: function({limit = 0, page = 1, id, title}) {
        return axios.get('http://127.0.0.1:8000/api/hunt', {
            params: {
                page: page,
                limit: limit,
                id: id,
                title: title,
            },
        })
    },

    getHunt: function(id) {
        return axios.get(`http://127.0.0.1:8000/api/hunt/${id}`, {

        })
    },
    
    postNewHunt: function() {
        return axios.post('', {
            // title: title,
            // date: date,
            // description: description,
        })
    },

    // postNewHunt2: function() {
    //     return axios.post('', {
    //         specie
    //     })
    // },

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

    login: function({ email, password, }) {
        return axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password
        });
    },

    getFederations: function() {
      return axios.get('http://127.0.0.1:8000/api/federation', {

      })
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
        return axios.post(`http://127.0.0.1:8000/api/logout`, {
            
        });
    },
}

export default HuntingTableService;