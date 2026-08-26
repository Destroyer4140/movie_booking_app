# 🚀movie_booking_app 🎦

## Requirement

- We have to create a movie booking app similar to BookMyShow, FaanDango, Paytm Movies etc.
- In this application users will be able to book the movies, directly from the application.

## Benefits?

- This helps in pre-booking of movie.
- Users can book the movies at any instance of time, depending on the avaibility.
- Users can book movie anytime, anywhere online.
- Users can list/view the movies and their show timings.
- Cinema Owners can you inform the user about the new release and discounts. Also can get feedback/reviews.
- Payments can be easily done online without an issue.
- We can preplan the schedules.

## Features

### Login & Signup

- Authentication (Only Valid Users can use the app) and Authorization (Role e.g
- (1). root admin which will be registered in the DB, no api endpoint require and has every access.
- (2). Other system admins can be registered in the app with root admin approval.
- (3). Clients can register to the system but will require approval from admins. Clients are theater owner.
- (4). Customer/User can directly register with application.
- (5). Login Api will be working on token based authentication.).

### Theater

- List Movies and Halls.
- We will setup movies theater resource.
- We will setup creation of new theater.
- Ability to update existing one.
- Fetch all the theaters.
- Filter the theaters based on city/pin.
- Delete the theater.

### Movies.

- Add movies in a theater.
- Remove movies in a theater.
- List all theater in which given movies running.
- Search for a movies.
- All movies from a theater.
- Details about the movies.

### Booking.

- Setup data model for booking and transaction.
- Authenticated users can book the movies.
- Avbitlity to cancel a booking.
- Ability to make a payment.
- List all your booking. (Upcoming, current and past).

### Actor Profiles

- System Admin
- Administrator of the whole system.
- Super User Access.
- CURD Operation on all resoureces.
- CURD Operation al clients.
- Clients
- Owners of a movie hall.
- One client can be owner of multiple halls.
- They will able to do CURD operation only on the theaters owned by them.
- Register User
- Our main end users/Customers visting the app and have details registered into the system.
- Browse movies and theaters.
- Book/Cancel a booking.
- List all the bookings.
- Drop rating and reviews for movies and theater.
- Unregister Users
- Those users who are visting the app but are not registered in the system.
- Can only do browse movies and halls.

### APIS

### Movies

- Create a movies -> /mba/api/v1/movies (post)
- List All movies -> /mba/api/v1/movies (get)
- Get a particular movie -> /mba/api/v1/movies/:id (get) detailed info about particular movie based on movieId.
- Get a movie based on name -> /mba/api/v1/movies?name='don' (get) detailed info about particular movie based on movieName.
- Delete the movie -> /mba/api/v1/movies/:id (delete)
- Update the movie -> /mba/api/v1/movies/:id (put)

### Theatre
- Setup a schema and model for theatre resources.
- We will decipher our business use case and figure out all the required properties for the schema.
- We will setup model, service, controller and route file, that will focus on theatre resource.
- apis (/mdb/api/v1/theatres)
  - Create a new theatre.
  - Update an existing theatre.
  - ability to get all the theatres.
  - filter the theatre based on property.
  - delete the theatre as well.

## DataBase Schema
- It's a skelton structure that represents the logical view of the entire database.
- It defines how data is organised and how the relations among them are associated.
- Inside mongodb there are multiple colletions possible
 - colletions1, collections2 etc.
 - For each collections has a there own schema. -> blurprint of documents
 - Inside each collections there are multiple documents possible.


## Project Dependency Setup

- npm init -> to create project and package.json
- npm i express -> to install express
- npm i nodemon -> to install nodemon
- npm i dotenv -> for env varibale setup
- 


## After the setup of theatre and movie resource, we want to start setting up authentication and authorization.

### Agenda
 - Understand Authentication and Authorization.
 - Token based authentication.
 - Setup model for the user collection.
 - APIs for User registration. (new User)
 - APIs for user login. (Basic)
 - Modify the login api to Token based authentication.
 - Secure storgae of passwords.
 - APIs for password reset.
 - Move to authorization, registration & setup of admin and client.
 - Both Authetication and Authorization are often used in conjunction with each other in terms of security.
 - Both terms are very different with totally different concepts.
 
### Authentication
- Process of verifying the identity of a user by obtaining their credentials and use those to verify the user's identity.
- It always comes before authorization.
- We are already familiar with process of authetication, bcs most of use perform it everyday.
- Once authenticatied there are many decission that happen simultaneously in the background bcs of secret power of admin.
- 