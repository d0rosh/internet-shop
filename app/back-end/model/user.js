var bcrypt = require('bcryptjs');
var mongoose = require('../configuration/mongoose');
var basketSchema = require('../model/basket').BasketSchema;
var userSchema = mongoose.Schema({
    login:{
        type:String,
        unique:true,
        min: [5,'login.length >= 5'],
        lowercase: true,
        required: [true, 'required'],
        validate: {
            isAsync: true,
            validator: function(value, cb) {
                User.findOne({login:value})
                .then(
                    res=>{
                        if(res) {
                            cb(false, 'exists')
                        }else{
                            if (value.length < 5) {
                                cb(false, 'login is short');
                            }else{
                                cb(true);
                            }
                        }   
                    },
                    err=>console.log(err)
                );
            }
        }
    },
    password:{
        type: String,
        required:[true,'required'],
        min:[5,'short'],
        max:[16, 'long'],
        validate: {
            isAsync: true,
            validator: function(value, cb){
                if (value.length < 5) {
                    cb(false, 'password is short');
                }else if(value.length > 16){
                    cb(false, 'password is long');
                }else {
                    cb(true);
                }
            }
        }
    },
    role:String,
    email:{
        type:String,
        required: [true, 'required'],
        validate: {
            isAsync: true,
            validator: function(value, cb) {
                var reg = /^[\w+\d+.-]+\@[\w+\d+_+]+\.[\w+\d+._]{2,3}$/;
                User.findOne({email:value})
                .then(
                    res=>{
                        if (res) {
                            cb(false,'exists')
                        }else {
                            if (reg.test(value)) {
                                cb(true)
                            }else {
                                cb(false, 'invalid')
                            }
                        }
                    }
                )
            }
        }
    },
    date: String,
    sex: String,
    images: String,
    phone:{
        type:String,
        required: [true, 'required'],
        validate: {
            isAsync: true,
            validator: function(value, cb) {
                var reg = /^\+380\d{9}$/;
                User.findOne({phone:value})
                .then(
                    res=>{
                        if (res) {
                            cb(false,'exists');
                        }else {
                             if (reg.test(value)) {
                                cb(true);
                            }else{
                                cb(false, 'invalid');
                            }
                        }
                    }
                );
            }
        }

    },
    basket:[basketSchema]
});

userSchema.pre('save', function(next, done){
    var self = this;
    if(!self.role && !self.date){
        self.role = 'user';
        self.date = new Date();
    }
    if(self.sex == 'men') {
        self.images = 'img/default_m.jpg'
    }else {
        self.images = 'img/default_w.jpg'
    }

    bcrypt.hash(self.password, 10).then(
        res=>{
            self.password=res;
            next();
        },
        err=>console.log(err)
    );
});

userSchema.methods.checkPassword = function(password){
    var self = this;
    return bcrypt.compare(password, self.password);
}

var User = mongoose.model('users', userSchema);

User.findOne({name:'admin'}).exec().then(
    res=>{
        if(!res){
            new User({login:'admin', password:'admin', sex: 'men', role:'admin', email:'andrew13dorosh@gmail.com',
            phone:'+380968517110', date: new Date() }).save();
        }
    }
);

// User.find().exec().then(
//     res=>console.log(res),
//     err=>console.log(err)
// );

// User.find({}).remove().then(
//     res=>console.log(res)
// )

module.exports = User;