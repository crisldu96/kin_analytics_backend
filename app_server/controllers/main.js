const request = require('request');
const apiOptions={
  server:'http://localhost:3000'
};
if(process.env.NODE_ENV==='production'){
  apiOptions.server='https://midireccion.herokuapp.com';
}
//============================
const renderHomepage = (req,res, responseBody)=>{
  let message=null;
  if(!(responseBody instanceof Array)){
    message="API lookup error";
    responseBody=[];
  }else{
    if(!responseBody.length){
      message="no hay lugares";
    }
  }
  res.render('home',
  {
    pageHeader:	{
      title:'Reservas Nacionales Ecuador',
      strapLine:'Da click en las difrentes regiones'
    },
    regiones: responseBody,
    message
  });
};
//=========================================
const home = (req, res)=> {
  const path='/api/region';

  const requestOptions={
    url:`${apiOptions.server}${path}`,
    method:'GET',
    json:{}
  };
  request(
    requestOptions,
    (err, response, body)=>{
      var data;
      //if(response.statusCode==200&&data.length){
      //}
      renderHomepage(req,res,body);

    }
  );
};
const info = function(req, res, next) {
  res.render('index', { title: 'region' });
}
//===================================
const renderingRegion=(req,res,region)=>{
  res.render('region',
  { pageHeader:
    {
      title:region.region,
      strapLine:'Observados desde la altura, los Andes ecuatorianos despliegan un collage de colores, como si la naturaleza hubiese tejido sobre ellos su propio tapiz.'
    },
    region
  });
}
//=============
const getRegionInfo = (req,res,callback)=>{
  const path=`/api/region/${req.params.regionid}`;
  const requestOptions={
    url:`${apiOptions.server}${path}`,
    method:'GET',
    json:{}
  };
  request(
    requestOptions,(err,{statusCode},body)  =>{
      if(statusCode==200)     {
        callback(req,res ,body);
      } else{
        showError(req,res,statusCode);
      }
    }  );
  };
  const getRegion = (req, res, next)=> {
    getRegionInfo(req,res,
      (req,res,responseData)=>renderingRegion(req,res,responseData));
      // request(  //
      //   requestOptions,(err,{response},body)=>{  //
      //       renderingRegion(req,res ,body);
      //     }  //
      //   }  );
    };
    //==============================
    const contacto = function(req, res, next) {
      res.render('index', { title: 'Contacto' });
    }
    //==================
    const showError = (req, res, status) => {
      let title = '';
      let content = '';

      if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear, Looks like we can\'t find this page. Sorry';
      } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
      }
      res.status(status);
      res.render('generic-text', {
        title,
        content
      });
    };
    //===========
    const renderAgregarForm = (req,res,region)=>{
      res.render('addParque',{
        title:`Agrega un Parque a la region ${region.region}`,
        pageHeader:`Agrega Parque a ${region.region}`
      });
    };
    //=======
    const agregarParque = (req, res)=> {
      const regionid=req.params.regionid;
      const path = `/api/region/${regionid}`;
      const postdata = {
        nombre:req.body.nombre,
        extension:req.body.extension,
        provincias:req.body.provincias
      };
      const requestOptions={
        url:`${apiOptions.server}${path}`,
        method:'POST',
        json:postdata
      };
      request(
        requestOptions,
        (err,{statusCode},body)=>{
          if(statusCode===201){
            res.redirect(`/region/${regionid}`);
          }else {
            showError(req,res,statusCode);
          }
        }
      );
    };
    //=================
    const getAgregarParque = function(req, res, next) {
      getRegionInfo(req,res,
        (req,res,responseData)=>renderAgregarForm(req,res,responseData));

      }
      module.exports={
        home,
        getRegion,
        info,
        contacto,
        agregarParque,
        getAgregarParque
      }
