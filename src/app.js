const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require('express')
const hbs=require('hbs')



const app=express()

const port=process.env.PORT||3000

//Define paths for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Set up handlebars and views location
app.set('view engine','hbs')   //Setting up handlebars integrated with express
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Raj Sangani'
    })
})

app.get('/about',(req,res)=>{           //This isnt file location its the location in the url we desire
    res.render('about',{
        title: 'About Me',
        name: 'Raj Sangani'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'Troubleshoot',
        title: 'Help',
        name:'Raj Sangani'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Provide an address'
        })
    }

    geocode(req.query.address,(error,data={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,  //express detects the json object we received and automatically stringify it
                location: data.location,
                address: req.query.address
            })


        })
    })



    
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        res.send({
            error:'You must provide a search term'
        })
    }
    else{
        console.log(req.query.search);

        res.send({
            products:[]
        })
    }
   
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help article not found',
        name:'Raj Sangani'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Page not found',
        name:'Raj Sangani'
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
    
})