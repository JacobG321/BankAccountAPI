const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'Customer must have a first name'],
        minLength:[3, "Customer's first name must be at least 3 characters long"]
    },
    middleName:{
        type:String,
        required:[false],
    },
    lastName:{
        type:String,
        required:[true, 'Customer must have a last name'],
        minLength:[3, "Customer's last name must be at least 3 characters long"]
    },
    addressMailing:{
            streetAddress:{
                type:String,
                required:[true, 'Customer must have an address'],
                minLength:[5, "Customer's address must be at least 5 characters long"]
            },
            city:{
                type:String,
                required:[true, 'Customer must have city'],
                minLength:[3, "Customer's city must be at least 3 characters long"]
            },
            state:{
                type:String,
                required:[true, 'Customer must have a state'],
                minLength:[2, 'Please choose a state'],
                // create a list of states to add here, make a seperate module and import it
            },
            zipcode:{
                type:Number,
                required:[true, 'Customer must have a zipcode'],
                minLength:[5, 'Zipcode must be 5 digits'],
                maxLength:[5, 'Zipcode must be 5 digits']
            }
        },
    // billing:{
    //         streetAddress:{
    //             type:String,
    //             required:[true, 'Customer must have an address'],
    //             minLength:[5, "Customer's address must be at least 5 characters long"]
    //         },
    //         city:{
    //             type:String,
    //             required:[true, 'Customer must have city'],
    //             minLength:[3, "Customer's city must be at least 3 characters long"]
    //         },
    //         state:{
    //             type:String,
    //             required:[true, 'Customer must have a state'],
    //             minLength:[4, 'State must be at least 4 characters long'],
    //         },
    //         zipcode:{
    //             type:Number,
    //             required:[true, 'Customer must have a zipcode'],
    //             minLength:[5, 'Zipcode must be 5 digits'],
    //             maxLength:[5, 'Zipcode must be 5 digits']
    //         },
    // },
    socialSecurityNumber:{
        type:Number,
        required:[true, 'Customer must have a social security number'],
        minLength:[9, 'Social security number must be 9 digits'],
        maxLength:[9, 'Social security number must be 9 digits']
    },
    email:{
        type:String,
        required:[true, 'Customer must have an email'],
        minLength:[5, "Customer's email must be at least 5 characters long"]
    },
    phoneNumber:{
        type:Number,
        required:[true, 'Customer must have a phone number'],
        minLength:[10, 'Phone number must be 10 digits'],
        maxLength:[10, 'Phone number must be 10 digits']
    },
    username:{
        type:String,
        required:[true, 'Customer must have a username'],
        minLength:[3, "Customer's username must be at least 3 characters long"]
    },
    // password:{
    //     required:[true, 'Customer must have a password'],
    //     minLength:[5, 'Password must be at least 5 characters']
    // },
    accounts:[]
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer