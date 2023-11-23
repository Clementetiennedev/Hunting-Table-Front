import axios from "axios";

const HuntingTableService = {

    //Hunt
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
            // society: society,
            // description: description,
            // speaces: speaces,
            // kill: kill
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

    login: function({ email, password, }) {
        return axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password
        });
    },

    register: function({ name, email, password, confirm_password, role_id }) {
        return axios.post('http://127.0.0.1:8000/api/register', {
          name: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
          role_id: role_id
        });
      },

      logout: function() {
        return axios.post(`http://127.0.0.1:8000/api/logout`, {
            
        });
    },
}

export default HuntingTableService;