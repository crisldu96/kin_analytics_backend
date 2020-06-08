const mongoose = require('mongoose');
//mi modelo importado en mi controlador
const Parq = mongoose.model('Parq');

const listaRegiones = (req, res) => {
  Parq
   .find()
   .select('region numParques')
   .exec((err,parque)=>{
     if(!parque){
       return res
         .status(404)
         .json({
           "message":"no hay ese parque"
         });
     } else if(err){
       return res
         .status(404)
         .json(err);
     }
     res
       .status(200)
       .json(parque);
   });
};
//--------------------------
const crearRegion = (req, res) => {
  Parq.create({
    region:req.body.region,
    numParques:req.body.numParques
  },(err,Parq)=>{
    if(err){
      res
        .status(400)
        .json(err);
    }else{
      res
        .status(201)
        .json(Parq);
    }
  });
};
//-----------------------------
const getUnaRegion = (req, res) => {
   Parq
    .findById(req.params.regionid)
    .exec((err,parque)=>{
      if(!parque){
        return res
          .status(404)
          .json({
            "message":"no hay ese parque"
          });
      } else if(err){
        return res
          .status(404)
          .json(err);
      }
      res
        .status(200)
        .json(parque);
    });
};
//----------------------------
const updateRegion = (req, res) => {
  if (!req.params.regionid) {
    return res
      .status(404)
      .json({
        "message": "No Location"
      });
  }
  Parq
  .findById(req.params.regionid)
  .select('-infoParque')
  .exec((err,region)=>{
    if(!region){
      return res
        .status(404)
        .json({
          "message": "No region"
        });
    }else if (err) {
      return res
        .status(404)
        .json(err);
    }
    region.region=req.body.region;
    region.numParques=req.body.numParques;
    region.save((err,reg)=>{
      if(err){
        return res
          .status(404)
          .json(err);
      }else {
        return res
          .status(404)
          .json(reg);
      }
    });
  });
};
//------------------------------
const borraRegion = (req, res) => {
  const regionid = req.params.regionid;
if (regionid) {
  Parq
    .findByIdAndRemove(regionid)
    .exec((err, region) => {
        if (err) {
          return res
            .status(404)
            .json(err);
        }
        res
          .status(204)
          .json(null);
      }
  );
} else {
  res
    .status(404)
    .json({
      "message": "No Location"
    });
}
};

module.exports={
  listaRegiones,
  crearRegion,
  getUnaRegion,
  updateRegion,
  borraRegion
}
