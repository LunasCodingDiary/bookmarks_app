const data = [
    {
      name: 'LinkedIn',
      URL: 'http://www.linkedin.com',
      category: 'jobs'
    },
    {
      name: 'Indeed',
      URL: 'http://www.indeed.com',
      category: 'jobs'
    },
    {
      name: 'Amazon',
      URL: 'http://www.amazon.com',
      category: 'shopping'
    },
    {
      name: 'W3C Shools - Javascript',
      URL: 'https://www.w3schools.com/jsref/default.asp',
      category: 'coding'
    },
    {
      name: 'Target',
      URL: 'http://www.shopping.com',
      category: 'shopping'
    },
    {
      name: 'The Weeknd',
      URL: 'https://www.theweeknd.com/',
      category: 'music'
    },
    {
      name: 'Stack Overflow',
      URL: 'https://stackoverflow.com/',
      category: 'coding'
    },
  ];


  const Sequelize = require('sequelize');
  const { STRING } = Sequelize;
  const conn = new Sequelize(process.env.DATABASE_URL||'postgres://localhost/acme_bookmarks_db')
 
 //model
  const Bookmark = conn.define('bookmark',{
    name : {type:Sequelize.STRING,
        allowNull: false
    },
    URL : Sequelize.STRING,
    category : Sequelize.STRING
    //column and datatype
    })
    
   
  const syncAndSeed = async() =>{
    await Bookmark.sync({force:true})  
    await Promise.all(data.map(bookmark => Bookmark.create(bookmark))) //.create
}
   //env: environment

   module.exports = {
       syncAndSeed,
       Bookmark
   }