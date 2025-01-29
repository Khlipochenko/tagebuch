import  { Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50

    },
    verified:{
        type:Date
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:6,
        maxLength:100,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(props){
                return `${props.value} ist eine ungultige E-Mail`
            }
        }
    },
    image:{
        type:String
    },
    password:{
        type:String,
        validate:{
            validator: function(value){
                return validator.isStrongPassword(value,{
                    minLength:8,
                    minSymbols:1,
                    minNumbers:1,
                    minUppercase:1,
                    minLowercase:1,
                })
            },
            message:function()
            {
                return 'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens 1 Sonderzeichen, 1 Großbuchstaben und 1 Zahl enthalten'
            }
        }

    }

})
userSchema.methods.toJSON=function(){
    const obj=this.toObject()
    delete obj.password;
    delete obj.__v
    return obj
}

userSchema.pre('save', function(){
    const salt=bcrypt.genSaltSync(10)
    this.password=bcrypt.hashSync(this.password, salt)
})
export const User=model('User', userSchema)