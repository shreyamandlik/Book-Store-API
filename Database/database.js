const books = [
    {
        isbn: "0001Book",
        title: "Peace",
        pubdate: "2021-08-09",
        language: "en",
        numpage: 250,
        author: [1, 2],
        publication: [1],
        category: ["nature", "human-psychology"]
    },

    {
        isbn: "0002Book",
        title: "Money",
        pubdate: "2021-08-10",
        language: "en",
        numpage: 200,
        author: [1],
        publication: [2],
        category: ["money", "human-psychology","finiance"]
    },
    {
        isbn: "0003Book",
        title: "Love",
        pubdate: "2021-08-13",
        language: "en",
        numpage: 200,
        author: [2],
        publication: [1],
        category: ["dance", "human-psychology",]
    },
    {
        isbn: "0004Book",
        title: "Dance",
        pubdate: "2021-08-12",
        language: "en",
        numpage: 200,
        author: [1],
        publication: [3],
        category: ["dance", "human-psychology",]
    }
]

const author = [{
    id: 1,
    name: "Shreya",
    books: ["0001Book", "0002Book","0004Book"]
},

{
    id: 2,
    name: "Rinku",
    books: ["0001Book", "0003Book"]

}]


const publication=[{
    id:1,
    name:"writex",
    books:["0001Book","0003Book"]
},
{
    id:2,
    name:"timely",
    books:["0002Book"]
},
{
    id:3,
    name:"fefi",
    books:["0004Book"]
},

] 


module.exports={books, author, publication}