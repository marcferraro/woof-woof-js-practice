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
            renderDogProfile(e.target)
        }
    })
}

function renderDogProfile(eventTarget){
    const dogId = eventTarget.dataset.id
    debugger
    
}


main()