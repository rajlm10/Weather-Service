const request=require('request')




const forecast=(lat,long,callback)=>{
    const URL=`https://api.darksky.net/forecast/2d39afc60c43446a29e6d05e22d609bc/${lat},${long}?units=si`


    request({url:URL,json:true},(error,response)=>{

        if (error) {
            callback('Unable to connect to the weather service',undefined);
            
        }
    
        else if (response.body.error) {
            callback('Unable to find location',undefined);
            
        }
        else{
            callback(undefined,`${response.body.daily.data[0].summary} The temperature right now is ${response.body.currently.temperature} C and the chances of rainfall right now are ${response.body.currently.precipProbability}%`);
        }
    })
}


module.exports=forecast