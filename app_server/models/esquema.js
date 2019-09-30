const mongoose=require('mongoose');

const parqueSchema = new mongoose.Schema({
	nombre:{
		type:String,
		required: true
	},
	provincias:[String],
	extension:{
		type:Number,
	}
})

const regionesSchema = new mongoose.Schema({
	region: {
		type: String,
		required: true
	},
	parquesNacionales: {
		type: String,
		required: true
	},
	infoParque:[parqueSchema]
});