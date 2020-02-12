console.log('Client side js');





const weatherForm=document.querySelector('form')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search=document.querySelector('input').value

    messageOne.textContent='Loading..'
    messageTwo.textContent='' //clear from any previous search

    fetch(`http://localhost:3000/weather?address=${search}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
            
        }

        else
        {
            messageOne.textContent=data.forecast+data.location
        }
    })
})

    
    
    
})