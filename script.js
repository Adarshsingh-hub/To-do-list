const checkboxlist = document.querySelectorAll('.custom-checkbox')// document.querySelectorAll: This method is used to select all the elements in the document that match the given CSS selector.
const inputFields = document.querySelectorAll('.goal-input')
const errorlabel = document.querySelector('.error')
const progressLabel = document.querySelector('progress-label') 
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')
const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well began is half done',
    'Just a step away',
    'Whoa! You just completed all the goals, time for chill:D',
]
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {} //This code retrieves the saved goals from localStorage (if they exist), parses them into an object, or assigns an empty object if no data is found.
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length //Object.values(allGoals): This extracts all the values (not the keys) from the allGoals object and returns them as an array. .filter((goal) => goal.completed): This filters through the array and returns only those goals where the completed property is true. .length: After filtering, the .length returns the total number of goals that are completed.
progressvalue.style.width = `${completedGoalsCount / 3 * 100}%`
progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
inputFields.forEach((input) => {
    if (!allGoals[input.id]) {
        allGoals[input.id] = { name: '', completed: false };
    }
});

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus', () => {
        progressbar.classList.remove('showerror')
    })

    input.addEventListener('input', (e) => {
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name = input.value;
        allGoals[input.id].completed = false;
        localStorage.setItem('allGoals', JSON.stringify(allGoals)) //This code saves a variable allGoals (which could be a list of goals or an object) to the browser's local storage, so it can be retrieved later. The JSON.stringify part converts the data to a format that can be stored as text in local storage.
    })
})

checkboxlist.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) =>{
        const allFieldsFilled = [...inputFields].every((input)=> { //[...] is used for converting nodelist ingto arrays and every is used to checjk all the conditions and if any condition is wrong then return false
            return input.value
        })
       if (allFieldsFilled){
        checkbox.parentElement.classList.toggle('completed') // This code finds the parent of a checkbox and adds the class 'completed' to it, which can then be used to style the parent element differently, like marking it as finished or checked.
         //toggle means hai to laga do nhin hai toh remove kardo
     //progressvalue.style.width = '33.33%'
     const inputId = checkbox.nextElementSibling.id
     allGoals[inputId].completed = !allGoals[inputId].completed //iska matlab true hai toh false kardo aur false hai toh true kardo
     completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
     progressvalue.style.width = `${completedGoalsCount / 3 * 100}%`
     progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
     localStorage.setItem('allGoals', JSON.stringify(allGoals))
       }
         else{
      progressbar.classList.add('showerror')

     }
        })
})

