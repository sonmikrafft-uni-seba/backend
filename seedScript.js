
import User from "./src/models/user.js";
import Transaction from "./src/models/transaction.js";
import mongoose from "mongoose";

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
    "password": "$2a$10$cXwkTyOJWpPcucg8mZPyk.clm97Z9RsDAaIFWhTg12wqOerdg7dZO",
    "userBanks": [],
    "categoryGroups":[{
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
            "conditionalFilter": "Aldi, Lidl, Rewe, Penny, Edeka",
            "budgetType": "Monthly",
            "budgetLimit": 100.0
        },{
            "_id": "62bd8c0c875450c9604cb25e",
            "name": "Restaurant",
            "conditionalFilter": "Restaurant, Mensa, McDonalds, Burger King",
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
            "conditionalFilter": "Bar, Pub, Campus Cneipe, Hopfendolde",
            "budgetType": "Monthly",
            "budgetLimit": 100.0
        },{
            "_id": "62bd8c2b694c69ea539b7c09",
            "name": "Club",
            "conditionalFilter": "Club, Rubys, Neuraum",
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
        "password": "$2a$10$IwU8f.mH/2K.59nercjRqOEaa0q.9AkskB4YxHfK8SO5U855FHOQC",
        "userBanks": [{
            "_id": "62bd8c5a1791518580cfe9ff",
            "requisitionId": "ABCD",
            "institutionId": "COBADEFFXXX",
            "name": "Commerz Bank",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62bd8c644d4e1bec4ef6ff87",
                "label": "EC-Card",
                "metaData": {},
                "accessToken": "TOKEN_1"
            }]
        }],
        "categoryGroups":[{
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
                "conditionalFilter": "Aldi, Lidl, Rewe, Penny, Edeka",
                "budgetType": "Monthly",
                "budgetLimit": 150.0
            },{
                "_id": "62bd8c8bdc3df9e169764717",
                "name": "Restaurant",
                "conditionalFilter": "Restaurant, Chopan, Hasian, Culinare",
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
                "conditionalFilter": "Bar, Pub, Campus Cneipe, Hopfendolde",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8ca571f81449e0fc7f4a",
                "name": "Coffee",
                "conditionalFilter": "Coffee, Kaffee, Café",
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
                "conditionalFilter": "Sport, Yoga, Swimm, Bath, Club",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8cbc23e48eb4f739e995",
                "name": "Streaming",
                "conditionalFilter": "Netflix, Disney, Spotify",
                "budgetType": "Monthly",
                "budgetLimit": 50.0
            },{
                "_id": "62bd8cc36b93d726fdb91cf3",
                "name": "Games",
                "conditionalFilter": "Steam, League, Games",
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
        "password": "$2a$10$aO.RVBvoh2FqZKm5b/ujkucrwAfXK/cU6WrhOp6J.2OCkKiYLd13i",
        "userBanks": [{
            "_id": "62bd8d049f2d4bcfcb10080b",
            "requisitionId": "ABCD",
            "institutionId": "COBADEFFXXX",
            "name": "Commerz Bank",
            "metaData": {},
            "bankAccounts":[{
                "_id": "62bd8d0dbf082bd92be27cae",
                "label": "EC-Card",
                "metaData": {},
                "accessToken": "TOKEN_1"
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
                "accessToken": "TOKEN_1"
            }]
        }],
        "categoryGroups":[{
            "_id": "62bd8d26714371e5a1b43872",
            "name": "Food",
            "budgetType": "Monthly",
            "budgetLimit": 500.0,
            "categories":[{
                "_id": "62bd8d2ff600664c374ef762",
                "name": "Supermarket",
                "conditionalFilter": "Aldi, Lidl, Rewe, Penny, Edeka",
                "budgetType": "Monthly",
                "budgetLimit": 350.0
            },{
                "_id": "62bd8d3988fa43e1d6ac2571",
                "name": "Restaurant",
                "conditionalFilter": "Restaurant, Chopan, Hasian, Culinare",
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
                "conditionalFilter": "Bahn, Lufthansa, Airport",
                "budgetType": "YEARLY",
                "budgetLimit": 600.0
            },{
                "_id": "62bd8d5487b43c372a6ed08f",
                "name": "Hotel",
                "conditionalFilter": "Hotel, Hostel, B&B",
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
                "conditionalFilter": "Fittness, Sport",
                "budgetType": "Monthly",
                "budgetLimit": 100.0
            },{
                "_id": "62bd8d6a9930dabac38785d8",
                "name": "Streaming",
                "conditionalFilter": "Netflix, Disney, Spotify",
                "budgetType": "Monthly",
                "budgetLimit": 50.0
            },{
                "_id": "62bd8d72dd3debb23aec5515",
                "name": "Fußball",
                "conditionalFilter": "Stadion, Wetten, Fußball",
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
                "conditionalFilter": "liability insurance, legal protection, travel insurance",
                "budgetType": "YEARLY",
                "budgetLimit": 400.0
            }]
        }]
    })
]


//skript
let doneUser = 0;

export const seedData = async () => {
  try {
    await User.deleteMany({});
    for (let i = 0; i < users.length; i++) {
      users[i].save(function (err, result) {
        doneUser++;
      });
    }

  } catch (err) {
    console.error(err);
  }
  console.log("Database is seeded from seedScript.");
};