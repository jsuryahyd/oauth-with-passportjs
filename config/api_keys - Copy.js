/**
 * add this file to .gitignore
 */

module.exports = {
    google:{
        clientID :"<clientID from your google developer console>",
        clientSecret :"<clientSecret from your google developer console>",
    },
    mongodb:{
        dbURI:"mongo db connection uri"//mongodb://<dbuser>:<dbpassword>@ds217138.mlab.com:17138/mongodb_practice
    },
    session:{
        cookieKey:'<random_secret_string>'
    }

}
