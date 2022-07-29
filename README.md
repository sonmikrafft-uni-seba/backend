# Getting Started with Budgetly Backend

Please find the corresponding Frontend [here](https://gitlab.lrz.de/seba-master-2022/team-03/frontend).

---

## Installation

Before we can start our application we need to start our mongoDB and the stripe CLI.

---

### Database installation

First we need to install docker-compose following [these](https://docs.docker.com/compose/install/) instructions. You may need to install Docker Engine first. How to install Docker can be found [here](https://docs.docker.com/engine/install/).

When docker and docker-compose are installed you can start or database by executiong `docker-compose up -d` in your Terminal. The flag `-d` is optional but useful if you don't want to use multiple terminal tabs. Keep in mind that you need to be in the `root backend` directory, since that's where our `docker-compose.yaml` file is. If necessary you can modify the database port in this `docker-compose.yaml` ifyou have a port conflict.
To stop the database one can run `docker-compose down`

---

### Stripe CLI installation

If you want to have access to our premium features, you need to install the Stripe CLI. Otherwise you won't be able to upgrade your free account.
To install the Striple CLI you can follow [those](https://stripe.com/docs/stripe-cli) offical instructions.

Once installed you need to run `stripe login` in your terminal and enter our Stripe credentials.
Those credentials normally would never endup here... but since this is for a graded submission here they are:

- user ga27pil@mytum.de
- pw: SEBAStripe@20220630

Now you can start the request forwarding by running:
`stripe listen --forward-to localhost:3001/webhook`

If you want to do any dummy payments in our frontend you can use
`4242 4242 4242 4242` as a card number and any dates for the two date fields.

---

### Backend installation and execution

In the project directory, you need to run

`yarn install`

to install all packages needed for our backend application.
If you don't have yarn installed check [those instructions](https://classic.yarnpkg.com/lang/en/docs/install/).

To start the backend application you need to run

`yarn start`

which will start our backend.

---

## Configuration

In `src/config.js` you can change:

- the `port` of the backend.
- the `mongoURI` if your mongodb is not running at `localhost:27017`.
- the `Frontend URL`.
- `JWT` related configurations.
- `Stripe` related configurations.
- `Nordigen Banking` related configurations.
