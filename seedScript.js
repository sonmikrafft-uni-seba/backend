
import User from "./src/models/user.js";
import Transaction from "./src/models/transaction.js";
import mongoose from 'mongoose';
import { mongoURI, port } from './src/config.js';

//3 mock users
const users = [
    //Tim Test, Student
   new User({
    "_id": "62baf1eb03e5955e3b4b21cc",
    "firstName": "Tim",
    "lastName": "Test",
    "email": "test@test.de",
    "subscriptionPlan": [
        "FREE"
    ],
    "password": "$2a$10$cXwkTyOJWpPcucg8mZPyk.clm97Z9RsDAaIFWhTg12wqOerdg7dZO",//test
    "userBanks": [{
        "_id": "62beae73ca99591537ad38a4",
        "name": "Cash",
        "metaData": {},
        "bankAccounts":[{
            "_id": "62beae808a0e08dec84728a2",
            "label": "Cash",
            "metaData": {},
            "accessToken": "TOKEN_1"
        }]
    }],
    "categoryGroups":[{
        "_id": "62beac362c72118d0639de28",
        "name": "No Group",
        "categories":[{
            "_id": "62beac4282a4345447da0c07",
            "name": "Uncategorized"
        }]
    },{
        "_id": "62bd8bae53a4879ce56d904b",
        "name": "Food",
        "budgetType": "Monthly",
        "budgetLimit": 200.0,
        "categories":[{
            "_id": "62bd8bfc02f4ef766003b577",
            "name": "Lieferando",
            "conditionalFilter": "Lieferando",
            "budgetType": "Monthly",
            "budgetLimit": 50.0
        },{
            "_id": "62bd8c03be63fe6d00b26986",
            "name": "Supermarket",
            "conditionalFilter": "Aldi OR Lidl OR Rewe OR Penny OR Edeka",
            "budgetType": "Monthly",
            "budgetLimit": 100.0
        },{
            "_id": "62bd8c0c875450c9604cb25e",
            "name": "Restaurant",
            "conditionalFilter": "Restaurant OR Mensa OR McDonalds OR Burger King",
            "budgetType": "Monthly",
            "budgetLimit": 50.0
        }]
    },{
        "_id": "62bd8c16e3f9daf690aeef8f",
        "name": "Fun",
        "budgetType": "Monthly",
        "budgetLimit": 150.0,
        "categories":[{
            "_id": "62bd8c238f5778e56abd511c",
            "name": "Bar",
            "conditionalFilter": "Bar OR Pub OR Campus Cneipe OR Hopfendolde",
            "budgetType": "Monthly",
            "budgetLimit": 100.0
        },{
            "_id": "62bd8c2b694c69ea539b7c09",
            "name": "Club",
            "conditionalFilter": "Club OR Rubys OR Neuraum",
            "budgetType": "Monthly",
            "budgetLimit": 50.0
        }]
    }]
}),

    //Mia Muster, Berufsanfängerin
    new User({
        "_id": "62bb5fff657be4ae0dcd8c14",
        "firstName": "Mia",
        "lastName": "Muster",
        "email": "muster@test.de",
        "subscriptionPlan": [
            "PREMIUM"
        ],
        "password": "$$2a$10$cXwkTyOJWpPcucg8mZPyk.clm97Z9RsDAaIFWhTg12wqOerdg7dZO",//test
        "userBanks": [{
            "_id": "62beadb6b57c882462c9a79d",
            "name": "Cash",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62beae313d0a62cda1272330",
                "label": "Cash",
                "metaData": {},
                "accessToken": "TOKEN_1"
            }]
        },{
            "_id": "62bd8c5a1791518580cfe9ff",
            "requisitionId": "ABCD",
            "institutionId": "COBADEFFXXX",
            "name": "Commerz Bank",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62bd8c644d4e1bec4ef6ff87",
                "label": "EC-Card",
                "metaData": {},
                "accessToken": "TOKEN_2"
            }]
        }],
        "categoryGroups":[{
            "_id": "62beac7fae6adfb22cc5ba34",
            "name": "No Group",
            "categories":[{
                "_id": "62beac8ea1de7d3d77353ba4",
                "name": "Uncategorized"
            }]
        },{
            "_id": "62bd8c765c7b38eb0bd33164",
            "name": "Food",
            "budgetType": "Monthly",
            "budgetLimit": 350.0,
            "categories":[{
                "_id": "62bd8c7d5c335acdba772a68",
                "name": "Lieferando",
                "conditionalFilter": "Lieferando",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8c85728a3c57334392d9",
                "name": "Supermarket",
                "conditionalFilter": "Aldi OR Lidl OR Rewe OR Penny OR Edeka",
                "budgetType": "Monthly",
                "budgetLimit": 150.0
            },{
                "_id": "62bd8c8bdc3df9e169764717",
                "name": "Restaurant",
                "conditionalFilter": "Restaurant OR Chopan OR Hasian OR Culinare",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            }]
        },{
            "_id": "62bd8c9658269ebe5a3a5100",
            "name": "Socialising",
            "budgetType": "Monthly",
            "budgetLimit": 150.0,
            "categories":[{
                "_id": "62bd8c9d150d9178383635f9",
                "name": "Bar",
                "conditionalFilter": "Bar OR Pub OR Campus Cneipe OR Hopfendolde",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8ca571f81449e0fc7f4a",
                "name": "Coffee",
                "conditionalFilter": "Coffee OR Kaffee OR Café",
                "budgetType": "Monthly",
                "budgetLimit": 50.0
            }]
        },{
            "_id": "62bd8cae20a90e00909ef919",
            "name": "Hobbies",
            "budgetType": "Monthly",
            "budgetLimit": 200.0,
            "categories":[{
                "_id": "62bd8cb551649e612fd02736",
                "name": "Sport",
                "conditionalFilter": "Sport OR Yoga OR Swimm OR Bath OR Club",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8cbc23e48eb4f739e995",
                "name": "Streaming",
                "conditionalFilter": "Netflix OR Disney OR Spotify",
                "budgetType": "Monthly",
                "budgetLimit": 50.0
            },{
                "_id": "62bd8cc36b93d726fdb91cf3",
                "name": "Games",
                "conditionalFilter": "Steam OR League OR Games",
                "budgetType": "MONTHLY",
                "budgetLimit": 50.0
            }]
        }]
    }),

    //Felix Filler, Familienvarter
    new User ({
        "_id": "62bb6167a4c266ad409f7248",
        "firstName": "Felix",
        "lastName": "Filler",
        "email": "filler@test.de",
        "subscriptionPlan": [
            "PREMIUM"
        ],
        "password": "$2a$10$cXwkTyOJWpPcucg8mZPyk.clm97Z9RsDAaIFWhTg12wqOerdg7dZO",//test
        "userBanks": [{
            "_id": "62beaec557529d1b6278b54a",
            "name": "Cash",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62beaed257756ecf808016fa",
                "label": "Cash",
                "metaData": {},
                "accessToken": "TOKEN_1"
            }]
        },{
            "_id": "62bd8d049f2d4bcfcb10080b",
            "requisitionId": "ABCD",
            "institutionId": "COBADEFFXXX",
            "name": "Commerz Bank",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62bd8d0dbf082bd92be27cae",
                "label": "EC-Card",
                "metaData": {},
                "accessToken": "TOKEN_2"
            }]
        },{
            "_id": "62bd8d17e23ff398ee3d35c1",
            "requisitionId": "ABCD",
            "institutionId": "COBADEFFXXX",
            "name": "Commerz Bank",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62bd8d20b82533dca206e9cb",
                "label": "EC-Card",
                "metaData": {},
                "accessToken": "TOKEN_3"
            }]
        }],
        "categoryGroups":[{
            "_id": "62bead212dd2b4946c96971d",
            "name": "No Group",
            "categories":[{
                "_id": "62bead2c315639614ebeb331",
                "name": "Uncategorized"
            }]
        },{
            "_id": "62bd8d26714371e5a1b43872",
            "name": "Food",
            "budgetType": "Monthly",
            "budgetLimit": 500.0,
            "categories":[{
                "_id": "62bd8d2ff600664c374ef762",
                "name": "Supermarket",
                "conditionalFilter": "Aldi OR Lidl OR Rewe OR Penny OR Edeka",
                "budgetType": "Monthly",
                "budgetLimit": 350.0
            },{
                "_id": "62bd8d3988fa43e1d6ac2571",
                "name": "Restaurant",
                "conditionalFilter": "Restaurant OR Chopan OR Hasian OR Culinare",
                "budgetType": "Monthly",
                "budgetLimit": 150.0
            }]
        },{
            "_id": "62bd8d4371f854770ab706b6",
            "name": "Traveling",
            "budgetType": "YEARLY",
            "budgetLimit": 1500.0,
            "categories":[{
                "_id": "62bd8d4d95d8d5ffbf4f0dfd",
                "name": "Traffic",
                "conditionalFilter": "Bahn OR Lufthansa OR Airport",
                "budgetType": "YEARLY",
                "budgetLimit": 600.0
            },{
                "_id": "62bd8d5487b43c372a6ed08f",
                "name": "Hotel",
                "conditionalFilter": "Hotel OR Hostel OR B&B",
                "budgetType": "Monthly",
                "budgetLimit": 700.0
            }]
        },{
            "_id": "62bd8d5a743eb479306124d5",
            "name": "Hobbies",
            "budgetType": "Monthly",
            "budgetLimit": 200.0,
            "categories":[{
                "_id": "62bd8d6317a6490c5b0ddc27",
                "name": "Sport",
                "conditionalFilter": "Fittness OR Sport",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8d6a9930dabac38785d8",
                "name": "Streaming",
                "conditionalFilter": "Netflix OR Disney OR Spotify",
                "budgetType": "Monthly",
                "budgetLimit": 50.0
            },{
                "_id": "62bd8d72dd3debb23aec5515",
                "name": "Fußball",
                "conditionalFilter": "Stadion OR Wetten OR Fußball",
                "budgetType": "MONTHLY",
                "budgetLimit": 50.0
            }]
        },{
            "_id": "62bd8d78f6fc4817c83f0aec",
            "name": "Insurance",
            "budgetType": "YEARLY",
            "budgetLimit": 1000,
            "categories":[{
                "_id": "62bd8d7fac7926c6b7f19927",
                "name": "Health Insurance",
                "conditionalFilter": "Health Insurance",
                "budgetType": "YEARLY",
                "budgetLimit": 600.0
            },{
                "_id": "62bd8d89f64bcb73d350f21d",
                "name": "other Insurances",
                "conditionalFilter": "liability insurance OR legal protection OR travel insurance",
                "budgetType": "YEARLY",
                "budgetLimit": 400.0
            }]
        }]
    })
]

//mock transactions
const transactions = [
//Tim Tests Transactions
new Transaction({
    "_id": "62bd9f4d38f13ab8469ba925",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 20.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Burger King München",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c0c875450c9604cb25e",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
new Transaction({
    "_id": "62bda07ba58b2eb1e9e0b846",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 15.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "McDonalds München",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c0c875450c9604cb25e",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
new Transaction({
    "_id": "62bda0c4ab07e58676d81a5c",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 7.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Mensa München",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c0c875450c9604cb25e",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
new Transaction({
    "_id": "62bda0ed6413ff8e89bddc0b",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 25.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Aldi München",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c03be63fe6d00b26986",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
new Transaction({
    "_id": "62bda116c2bf166e48f32039",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 30.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Rewe München",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c03be63fe6d00b26986",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
new Transaction({
    "_id": "62bda1479fef123df6a53e10",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 90.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Campus Cneipe Garching",
    "transactionType": "MANUAL",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62beae808a0e08dec84728a2",
    "categoryID": "62bd8c238f5778e56abd511c",
    "userID": "62baf1eb03e5955e3b4b21cc"
}),
//Mia Musters Transactions
new Transaction({
    "_id": "62bef14b9411e07b43876c5f",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 60.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Therme Erding",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62beac8ea1de7d3d77353ba4",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef15885bda443bd912924",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 560.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Miete",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62beac8ea1de7d3d77353ba4",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1a09f2987b5607d09d2",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 1800.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Gehalt",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "incoming",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62beac8ea1de7d3d77353ba4",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1ab598796b64dd58814",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 100.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Oma",
    "remittanceInformation": "Alles Liebe",
    "transactionType": "incoming",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62beac8ea1de7d3d77353ba4",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1b5205dea7b4cb2dd09",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 37.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Aldi",
    "remittanceInformation": "Danke für den Einkauf",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1c9ef4d62da275514cd",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 42.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Edeka",
    "remittanceInformation": "Danke für den Einkauf",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1d463447fb465a5291f",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 24.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Lidl",
    "remittanceInformation": "Danke für den Einkauf",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1dea56aff9c354e8931",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 45.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Hasian",
    "remittanceInformation": "Buffet",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1ef63aa1229f60bd3ba",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 30.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Restaurant Radischen",
    "remittanceInformation": "Ganz viele Radieschen",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef1fcdb7bea4cf161bd9d",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 12.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Restaurant Rettich",
    "remittanceInformation": "Ganz viele Rettich",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c85728a3c57334392d9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef20675c504c907c0a831",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 23.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Campus Cneipe Garching",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8c9d150d9178383635f9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef21b6e385dc21bdaf521",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 60.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Irish pub",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62beae313d0a62cda1272330",
    "categoryID": "62bd8c9d150d9178383635f9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef2253bcd68a2f104cad7",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 30.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Hopfendolde",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8c9d150d9178383635f9",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef22eb0a62b3c6fe86f44",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 25.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Yoga Dream",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8cb551649e612fd02736",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef23f93ba8ac90405ac14",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 10.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Netflix",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8cbc23e48eb4f739e995",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef25dbb9e1bd1c24a3a28",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 20.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Disney Plus",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8cbc23e48eb4f739e995",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef2685b5de353ed6820fb",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 5.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Spotify",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8cbc23e48eb4f739e995",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef29b24c7b22a0f5319d8",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 13.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Lieferando",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "507f191e810c19729de860f2",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bef2a5b46ec57e981cd018",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 27.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Lieferando",
    "remittanceInformation": "Invoice #11449",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "507f191e810c19729de860f2",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bda2a7daa2cb5bbb7b356c",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 40.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Lieferando",
    "remittanceInformation": "Invoice #11579",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "507f191e810c19729de860f2",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bda30a549badd8c2442ea7",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 5.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Kaffee Kübel",
    "remittanceInformation": "Invoice #12579",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8ca571f81449e0fc7f4a",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bda317c2265fb255e69018",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 5.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Kaffee Krause",
    "remittanceInformation": "Invoice #1379",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8ca571f81449e0fc7f4a",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
new Transaction({
    "_id": "62bda357f2bc2b8491ec71d3",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 55.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Steam",
    "remittanceInformation": "Last of Us 5",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8c644d4e1bec4ef6ff87",
    "categoryID": "62bd8cc36b93d726fdb91cf3",
    "userID": "62bb5fff657be4ae0dcd8c14"
}),
//Felix Filler Transactions
new Transaction({
    "_id": "62bda41a5d292ed22341ad47",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 300.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Hotel Husten",
    "remittanceInformation": "Room 66",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": false,
    "bankAccountID": "62bd8d0dbf082bd92be27cae",
    "categoryID": "62bd8d5487b43c372a6ed08f",
    "userID": "62bb6167a4c266ad409f7248"
}),
new Transaction({
    "_id": "62bda499a3e91b4018bba6ff",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 350.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Hotel Hallo",
    "remittanceInformation": "Room 587",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8d20b82533dca206e9cb",
    "categoryID": "62bd8d5487b43c372a6ed08f",
    "userID": "62bb6167a4c266ad409f7248"
}),
new Transaction({
    "_id": "62bda4d04e1e62973cad0d6f",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 20.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Netflix",
    "remittanceInformation": "Besser Streamen",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8d20b82533dca206e9cb",
    "categoryID": "62bd8d6a9930dabac38785d8",
    "userID": "62bb6167a4c266ad409f7248"
}),
new Transaction({
    "_id": "62bda50a428dee39783041b5",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 23.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Disney Plus",
    "remittanceInformation": "Besser Streamen",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8d20b82533dca206e9cb",
    "categoryID": "62bd8d6a9930dabac38785d8",
    "userID": "62bb6167a4c266ad409f7248"
}),
new Transaction({
    "_id": "62bda5527ec3f5532044b692",
    "bookingDate":"2022-04-23T18:25:43.511Z",
    "valueDate":"2022-04-24T18:23:43.511Z",
    "transactionAmount": 10.00,
    "transactionCurrency":"EUR",
    "transactionPartnerName": "Spotify",
    "remittanceInformation": "Besser Streamen",
    "transactionType": "outgoing",
    "verified": true,
    "transactionViewed": true,
    "bankAccountID": "62bd8d20b82533dca206e9cb",
    "categoryID": "62bd8d6a9930dabac38785d8",
    "userID": "62bb6167a4c266ad409f7248"
}),
]


//seeding skript
export const seedData = async () => {
  try {
    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
      users[i].save(function (err, result) {});
    }

    await Transaction.deleteMany({});
    for (let i = 0; i < transactions.length; i++) {
        transactions[i].save(function (err, result) {});
      }

  } catch (err) {
    console.error(err);
  }
  console.log("Database is seeded from seedScript.");
  console.log("To end klick STRG+C");
};

//Connect to the MongoDB database
mongoose
  .connect(mongoURI)
  .catch((err) => {
    console.log('Error connecting to the database', err.message);
    process.exit(err.statusCode);
  });

//seed data
seedData();
