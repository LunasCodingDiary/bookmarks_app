const express=require('express')

const db = require('./db');
const init = async()=>{
    await db.syncAndSeed();
} 

init()

const app = express();
app.listen(3000,()=>{});

app.get('/',(req,res,next)=>{
 res.redirect('/bookmarks')
})

app.get('/bookmarks', async(req,res,next)=>{
    const bookmarks= await db.Bookmark.findAll()
    
    let categories={}
    bookmarks.forEach(bookmark=>{
        console.log(bookmark)
        if (! (bookmark.category in categories)) {
            categories[bookmark.category]=0
        }
       categories[bookmark.category]++
    })
 
    res.send(`
    <html>
     <head>
     <title> Bookmark </title>
     <style> 
     *{
         text-align: center
     }
     </style>
     </head>
     
     <body>
       <h1> Bookmarker </h1>
       <form>
         <input type="text" placeholder="enter site name"></input> 
         <br/>
         <input type="text" placeholder="enter site url"></input>
         <br/> 
         <input type="text" placeholder="enter category"></input>
         <br/>
         <button>save</button>
       </form>

       <ul list-style="none">
        ${Object.entries(categories).map( entry => {
            return  `
            <li><a href='/bookmarks/${entry[0]}'>${entry[0]}(${entry[1]})</a></li>`
        }).join('')
        } 
       </ul>
     </body>    
    </html>
    `)
})

app.get('/bookmarks/:category', async(req,res,next)=>{
  const category = req.params.category
  const cateBookmarks = await db.Bookmark.findByPk(category)

  res.send(`
    <html>
     <head>
     <title> Bookmark - ${category} </title>
     <style> 
     *{
         text-align: center
     }
     </style>
     </head>
     
     <body>
       <h1> Bookmarker </h1>
       <a href='/bookmarks'> <<back </a>
       <h2>job search</h2>
       
       <ul list-style="none">
        ${Object.entries(categories).map( entry => {
            return  `
            <li><a href='/bookmarks/${entry[0]}'>${entry[0]}(${entry[1]})</a></li>`
        }).join('')
        } 
       </ul>
     </body>    
    </html>
    `)

}

)