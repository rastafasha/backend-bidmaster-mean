var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
        default: Date.now
        
    },
    partners:{
        type:Array,
        required:false,
        
    },
    status:{
        type:Boolean,
        required:false,
        default:false
        
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    type: { type: String, require: false },
    hasPresentation: { type:Boolean, require: false, default:false },
    deliveryDate: { type: String, require: false },
}, {
    timestamps:true
});

module.exports = mongoose.model('Project', projectSchema);