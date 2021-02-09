const DOG_URL = "http://localhost:3000/pups"

function main(){
    console.log("who let the doges out")
    fetchDogs()
    addClickListener()
}

function fetchDogs(){
    fetch(DOG_URL)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
    const dogBar = document.getElementById('dog-bar')
    const span = document.createElement('span')

    span.innerText = dog.name
    span.dataset.id = dog.id

    dogBar.append(span)
}

function addClickListener(){
    const body = document.querySelector('body')

    body.addEventListener('click', function(e){
        e.preventDefault

        if (e.target.nodeName === "SPAN"){
            fetchDogProfile(e.target)
        }

        if (e.target.id === 'good-bad-button'){
            toggleGoodness(e.target)
        }

        if (e.target.id === 'good-dog-filter'){
            if (e.target.value === "false"){
                e.target.value = "true"
                e.target.innerText = "Filter good dogs: ON"
                const dogBar = document.getElementById('dog-bar')
                dogBar.innerHTML = ""
                // e.target.innerHTML = ""
                fetchGoodDogs()
            } else {
                e.target.value = "false"
                e.target.innerText = "Filter good dogs: OFF"
                const dogBar = document.getElementById('dog-bar')
                dogBar.innerHTML = ""
                fetchDogs()
            }
        }
    })
}

function fetchDogProfile(eventTarget){

    fetch(DOG_URL + `/${eventTarget.dataset.id}`)
    .then(resp => resp.json())
    .then(dog => renderDogProfile(dog))
    
}

function renderDogProfile(dog){
    const div = document.getElementById('dog-info')
    div.innerHTML = ""

    const img = document.createElement('img')
    img.src = dog.image

    const h2 = document.createElement('h2')
    h2.innerText = dog.name

    const button = document.createElement('button')
    button.dataset.id = dog.id
    button.id = 'good-bad-button'
    if (dog.isGoodDog){
        const goodness = "Good Dog!"
        button.innerText = goodness
    } else {
        const goodness = "Bad Dog!"
        button.innerText = goodness
    }
    
    div.append(img, h2, button)
}

function toggleGoodness(eventTarget){

    let goodness = {}

    if (eventTarget.innerText === "Good Dog!"){
        goodness = {isGoodDog: false}
    } else {
        goodness = {isGoodDog: true}
    }

    const reqObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(goodness)
    }

    fetch(DOG_URL + `/${eventTarget.dataset.id}`, reqObj)
    .then(resp => resp.json())
    .then(dog => renderDogProfile(dog))
}

function fetchGoodDogs(){
    fetch(DOG_URL)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => renderGoodDog(dog)))
}

function renderGoodDog(dog){
    if (dog.isGoodDog){
        renderDog(dog)
    }
}

main()