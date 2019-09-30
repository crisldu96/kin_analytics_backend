const home = function(req, res, next) {
  res.render('home', 
  	{ 
  		pageHeader:	{
  			title:'Reservas Nacionales Ecuador',
  			strapLine:'Da click en las difrentes regiones' 
  		},
  		regiones:[{
  			region:'Andes',
  			parquesNacionales:'Siete',
  		},
  		{
  			region:'Amazonia',
  			parquesNacionales:'Dos',
  		},
  		{
  			region:'Galapagos',
  			parquesNacionales:'Uno',
  		},
  		{
  			region:'Costa',
  			parquesNacionales:'Uno',
  		}

  		]
  	}
  	);
}
const info = function(req, res, next) {
  res.render('index', { title: 'region' });
}
const region = function(req, res, next) {
  res.render('region', 
  	{ pageHeader:	
  		{
  			title:'Los Andes',
  			strapLine:'Observados desde la altura, los Andes ecuatorianos despliegan un collage de colores, como si la naturaleza hubiese tejido sobre ellos su propio tapiz.' 
  		},
  		parquesNacionales:[
  		{
  			nombre:'Cayambe Coca',
  			provincias:['Imbabura', 'Napo', 'Pichincha', 'Sucumbios'],
  			extension: 404103
  		},
  		{
  			nombre:'Cotopaxi',
  			provincias:['Cotopaxi', 'Napo', 'Pichincha'],
  			extension: 33393
  		},
  		{
  			nombre:'Llanganates',
  			provincias:['Cotopaxi', 'Napo', 'Pastaza', 'Tungurahua'],
  			extensino: 219931
  		}]
  	});
}
const contacto = function(req, res, next) {
  res.render('index', { title: 'Contacto' });
}

module.exports={
	home,
	region,
	info,
	contacto
}
