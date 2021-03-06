const mongoose=require('mongoose');

//const dbURI = 'mongodb://localhost/reservas';
const dbURI = 'mongodb://localhost/test';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
	console.log('mongoose connected to '+dbURI);
});
mongoose.connection.on('error',err =>{
	console.log('mongoose connection error',err);
});
mongoose.connection.on('disconnected',() =>{
	console.log('mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
require('./esquema');
