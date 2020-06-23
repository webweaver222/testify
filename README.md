# Testify
SPA for creating and passing tests

# Couple words
This is my third project where i continue to learn web technologies. The idea of creating testing service was given by visitors of 2ch/pr internet forum.
Functional requirements for app i defined by myself from the user point of view. Design of the project is rather rudimentary because never was a goal to achieve.
This project should be used together with [testify_api](https://github.com/webweaver222/testify_api). 

# App description

The service consist of two seperate parts: 

- **Test Creator** 
  Gives a user instrument to create tests and get a link for passing them. 
    * For each question creator can define to 5 answer options
    * Creator can easily change questions order by drag and drop in specific area (aka Question-Pool)
    * Questions can be removed/edited quickly by using Question-Pool
    * Creator can define time limit for test process
    * Creator can get resaults of every passing try by Email
    
 - **Testing room**
    You can start the process by following a link given by test creator. 
      * Clicking start will trigger timer (if creator put time limit)
      * Timer is duplicated on the server thus can't be tricked
      * User can easily navigate through questions
      * Tesing proccess finishes either by user sending answers or by the timer
      
      
 # What i used :
  * React/Redux
  * [Koa.js for backend](https://koajs.com/)
  * [Sequelize ORM](https://sequelize.org/)
  * [React List Drag and Drop](https://www.npmjs.com/package/react-list-drag-and-drop)
  * [Pug for email template](https://pugjs.org/api/getting-started.html)
 
 
