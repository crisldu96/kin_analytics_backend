const home = function(req, res, next) {
  res.render('index', { title: 'Home' });
}
const info = function(req, res, next) {
  res.render('index', { title: 'Info' });
}
const contacto = function(req, res, next) {
  res.render('index', { title: 'Contacto' });
}

module.exports={
	home,
	info,
	contacto
}
