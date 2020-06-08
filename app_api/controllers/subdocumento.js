const mongoose = require('mongoose');
//mi modelo importado en mi controlador
const Parq = mongoose.model('Parq');


//---------------------------------
const getParque = (req, res) => {
  Parq
  .findById(req.params.regionid)
  .select('region infoParque')
  .exec((err,parque)=>{
    if (!parque) {
      return res
      .status(404)
      .json({
        "mensaje": "no se encontro región"
      });
    }else if (err) {
      return res
      .status(404)
      .json(err);
    }
    if (parque.infoParque && parque.infoParque.length>0) {
      const parqDatos = parque.infoParque.id(req.params.parqueid);
      if(!parqDatos){
        return res
        .status(404)
        .json({
          "mensaje":"no se encontró parque"
        });
      }else{
        response={
          parque:{
            region:parque.region,
            id:req.params.regionid
          },
          parqDatos
        };
        return res
        .status(200)
        .json(response);
      }
    }else{
      return res
      .status(404)
      .json({
        "message":"no se encontró´parque 2"
      });
    }
  });
};
//-------------------------------------
const crearParque = (req, res) => {
  const regionid = req.params.regionid;
  if (regionid) {
    Parq
    .findById(regionid)
    .select('infoParque')
    .exec((err, region) => {
      if (err) {
        res
        .status(400)
        .json(err);
      } else {
        agregarParque(req, res, region);
      }
    });
  } else {
    res
    .status(404)
    .json({"message": "no se encontro region"});
  }
};
//---------------------------
const agregarParque = (req, res, region) => {
  if (!region) {
    res
    .status(404)
    .json({"message": "region not found"});
  } else {
    const nombre = req.body.nombre;
    const provincias=req.body.provincias.split(",");
    const extension = req.body.extension;
    region.infoParque.push({
      nombre,
      provincias,
      extension
    });
    region.save((err, region) => {
      if (err) {
        res
        .status(400)
        .json(err);
      } else {
        const thisParque = region.infoParque[region.infoParque.length-1];
        res
        .status(201)
        .json(thisParque);
      }
    });
  }
};
//-----------------
const updateParque = (req, res) => {
  if (!req.params.regionid||!req.params.parqueid) {
    return res
      .status(404)
      .json({"mensaje" : "faltan parametros"});
  }
  Parq
  .findById(req.params.regionid)
  .select('infoParque')
  .exec((err,region)=>{
    if(!region){
      return res
      .status(404)
      .json({"mensaje" : "No se encuentra region"});
    }else if (err) {
      return res
      .status(400)
      .json(err);
    }
    if(region.infoParque&&region.infoParque.length>0){
      const thisParque=region.infoParque.id(req.params.parqueid);
      if(!thisParque){
        res
        .status(404)
        .json({"mensaje" : "no se encuentra parque"});
      }else {
        thisParque.nombre=req.body.nombre;
        thisParque.provincias=req.body.provincias.split(",");
        thisParque.extension=req.body.extension;
        region.save((err,region)=>{
          if (err) {
            res
            .status(404)
            .json(err);
          }else {
            res
            .status(200)
            .json(thisParque);
          }
        });
      }
    }else{
      res
      .status(404)
      .json({"mensaje" : "no hay parque que actualizar"});
    }
  }
);
};
//----------------
const borraParque = (req, res) => {
  if (!req.params.regionid||!req.params.parqueid) {
    res
    .status(404)
    .json({"mensaje" : "faltan parametros"});
  }
  Parq
    .findById(req.params.regionid)
    .select('infoParque')
    .exec((err,region)=>{
      if(!region){
        return res
        .status(404)
        .json({"mensaje" : "no se encuntra region"});
      } else if (err) {
        return res
        .status(400)
        .json(err);
      }
      if(region.infoParque&&region.infoParque.length>0){
        if(!region.infoParque.id(req.params.parqueid)){
          return res
          .status(404)
          .json({"mensaje" : "no se encuentra parque"});
        }else {
          region.infoParque.id(req.params.parqueid).remove();
          region.save(err=>{
            if(err){
              return res
              .status(404)
              .json(err);
            }else{
              res
              .status(204)
              .json(null);
            }
          });
        }
      }else {
        res
        .status(404)
        .json({"mensaje" : "no se borro parque"});
      }
    });

};
module.exports={

  getParque,
  crearParque,
  updateParque,
  borraParque
}
