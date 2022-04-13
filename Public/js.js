console.log("lamoooooooo")
//EventListner for the submit button
document.getElementById("submit").addEventListener("click",async e => {

    e.preventDefault();

    // Get Form Data

    let form = document.querySelectorAll("form")

    let formdata = new FormData(form[0]);

    let data = {

        name: formdata.get('name'),
        email: formdata.get('email'),
        password: formdata.get('password'),
        sex: formdata.get('sex')

    }
    //Check if the data is empty or not
    if(data.name != '' && data.email != '' && data.password != ''){
        // Create an object to fetch to the server

        const options = {

            method:'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)

        }

        // Fetch the object to the server and recive responce from the server
        
        console.log('l',JSON.stringify(data))
        const responce  = await fetch('/api',options)
        const json = await responce.json()
        console.log(json.ye)

        // Check weather the name is repeated
        
        async function check_name_repeated(){

            if (json.ye == false) {
                console.log('------------Dups-----------')
        
                document.getElementById('noname').classList.add('noname')
                document.getElementById('noname').classList.remove('chname')
        
            }
            else if(json.ye == true) {
        
                document.getElementById('noname').classList.add('chname')
                document.getElementById('noname').classList.remove('noname')

                window.location = "https://www.youtube.com/watch?v=SBjQ9tuuTJQ";
        
            }
        }
        check_name_repeated()
    }

})//End of the event listner which is for the submit button 

// RegEx Validate Function
function validate_RegEx(feild,regex) {

    console.log("feild class name -", feild.className);
    // console.log("test result -",regex.test(feild.value))

    if(regex.test(feild.value) == true){
        
        feild.className = 'valid';
        document.getElementById('submit').disabled = false;

    }else if (regex.test(feild.value) == false) {

        feild.className = 'invalid';
        document.getElementById('submit').disabled = true;

    }
}
// Check if the Feild is valid
function check_RegEx(){

    console.log('Checking')

    const inputs = document.querySelectorAll('input')
    
    const RegEx_patterns = {

        'name': /^[a-z\d]{5,12}$/gi,
        'email': /^.+\@.+\..+$/gi,
        'password': /^[a-z\d]{8,}$/gi,
        'sex': /./gi
    }
    //Foreach loop for checking the inputs
    inputs.forEach(input => {

        //EventListner for checking every time a letter is entered

        input.addEventListener('keyup', e =>{

            validate_RegEx(e.target,RegEx_patterns[e.target.name])
            
        })
    })
}
check_RegEx();
