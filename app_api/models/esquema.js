const mongoose=require('mongoose');

const parqueSchema = new mongoose.Schema({
	nombre:{
		type:String,
		required: true
	},
	provincias:[String],
	extension: {
		type:String
	}
});

const regionesSchema = new mongoose.Schema({
	region: {
		type: String,
		required: true
	},
	numParques: {
		type: String,
		required: true
	},
	infoParque:[parqueSchema]
});

mongoose.model('Parq',regionesSchema,'parques');
//mongoose.model('Parq',regionesSchema,'parqueNacionales');
