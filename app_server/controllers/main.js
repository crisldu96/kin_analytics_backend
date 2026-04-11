const axios = require('axios');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://midireccion.herokuapp.com';
}

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'no hay lugares';
    }
  }
  res.render('home', {
    pageHeader: {
      title: 'Reservas Nacionales Ecuador',
      strapLine: 'Da click en las difrentes regiones'
    },
    regiones: responseBody,
    message
  });
};

const home = (req, res) => {
  const url = `${apiOptions.server}/api/region`;
  axios.get(url)
    .then(response => renderHomepage(req, res, response.data))
    .catch(() => renderHomepage(req, res, null));
};

const info = function(req, res, next) {
  res.render('index', { title: 'region' });
};

const renderingRegion = (req, res, region) => {
  res.render('region', {
    pageHeader: {
      title: region.region,
      strapLine: 'Observados desde la altura, los Andes ecuatorianos despliegan un collage de colores, como si la naturaleza hubiese tejido sobre ellos su propio tapiz.'
    },
    region
  });
};

const showError = (req, res, status) => {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page not found';
    content = "Oh dear, Looks like we can't find this page. Sorry";
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', { title, content });
};

const getRegionInfo = (req, res, callback) => {
  const url = `${apiOptions.server}/api/region/${req.params.regionid}`;
  axios.get(url)
    .then(response => {
      if (response.status === 200) {
        callback(req, res, response.data);
      } else {
        showError(req, res, response.status);
      }
    })
    .catch(err => {
      const status = err.response?.status || 500;
      showError(req, res, status);
    });
};

const getRegion = (req, res, next) => {
  getRegionInfo(req, res, (req, res, responseData) => renderingRegion(req, res, responseData));
};

const contacto = function(req, res, next) {
  res.render('index', { title: 'Contacto' });
};

const renderAgregarForm = (req, res, region) => {
  res.render('addParque', {
    title: `Agrega un Parque a la region ${region.region}`,
    pageHeader: `Agrega Parque a ${region.region}`
  });
};

const agregarParque = (req, res) => {
  const regionid = req.params.regionid;
  const postdata = {
    nombre: req.body.nombre,
    extension: req.body.extension,
    provincias: req.body.provincias
  };
  axios.post(`${apiOptions.server}/api/region/${regionid}`, postdata)
    .then(response => {
      if (response.status === 201) {
        res.redirect(`/region/${regionid}`);
      } else {
        showError(req, res, response.status);
      }
    })
    .catch(err => {
      const status = err.response?.status || 500;
      showError(req, res, status);
    });
};

const getAgregarParque = function(req, res, next) {
  getRegionInfo(req, res, (req, res, responseData) => renderAgregarForm(req, res, responseData));
};

module.exports = { home, getRegion, info, contacto, agregarParque, getAgregarParque };
