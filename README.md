## **NestJS API and Scrapper**

This API was developed with this stack: Framework NestJS, Typescript and ORM Prisma.io with Postgres, and for the Scrapper I use puppeteer.
Use authentication with JwtStrategy, generate a Bearer token, all the endpoints are protected with this strategy.

Download and run the project

    npm install
    npm run start:dev

and you have to run `npx prisma migrate dev` for generate the table in db.

## /users

    GET /users

This endpoints will return all the users in our DB with a response JSON will look like this:

    {
    	code:  200,
    	message:  'OK',
    	users:  findAll,
    };

We can create new users with the POST method like this

    POST /users

we must have to pass in the body JSON

    {
        "name":  "Verenice Miranda",
        "email":  "verenice@gmail.com",
        "password":  "123456"
    }

All the info above is fake. It will return the same `json + Id`

If we want to make a update in our users we use the `PUT`, like the `POST`the same popertys , and pass the `id` from the user

    PUT /users/:id

Like the `PUT` method the `DELETE`is the same way, just we dont have to pass a body `JSON`, just the `Id` in the params

To get one users we can use `GET /users/:id`

## /posts

if we want to search in our Posts tables with a category we can use this endpoints and will return all the Posts with the category

    GET /api/articles/:category

return this object:

    "code":  200,
    "message":  "OK",
    "post":  {
    		"id":  13,
    		"authorId":  2,
    		"title":  "5 trends in logistics for 2022",
    		"published_at":  "December 15, 2021",
    		"source_link":  "https://cargofive.com/5-trends-in-logistics-for-2022/"
    		"category":  "innovation",
    		"body_description":  "These last few years have been challenging for the logistics sector and the supply chain. Now, more than ever, freight forwarders must be aware of new trends to add more value to their efforts and stay one step ahead of their competition. So what can we expect for the upcoming year? The trends in logistics for this next year…",
    		"author":  {
    					"id":  2,
    					"name":  "Verenice Miranda",
    					"email":  "verenice@gmail.com",
    					"password":  "123456"
    		}
    	}
    }

And of course we have to handle the info returned of the users

Create a posts we have the endpoints

    POST api/articles

receive this `JSON`, with real information

    {
        "title":  "Why we need to work",
        "body_description":  "I want to get the job",
        "category":  "JOS",
        "source_link":  "linkkkkkkkkkkkk",
        "published_at":  "2020-03-19T14:21:00+02:00",
        "authorId":  2
    }

It will return the same `JSON + ID`

Like the `POST` method with `PUT` we must have to send a data like before, but in this case the `id` of the article

    PUT api/articles/:id

And for `GET`just `ONE` or `DELETE` we use the same endpoints before but with the method `GET` or `DELETE`
To get `POSTS` by `author` we use:

    GET api/articles/:author

It will return a `JSON` with the satus code, the info of the users and all his posts

## Scraper

We use puppeter for scraping, the endpoints we will use for scraper the page is:

    GET /scrapper

After scraping the page we handle the information and save on db, every article have an author and we search in our table to rolate the `articles` with de `user`

## Login

For authenticate the use:

    POST auth/login

we must have to pass in body `JSON` the `email` and `password`it will return:

    {
    	"code":  200,
    	"access_token":  "token"
    }
