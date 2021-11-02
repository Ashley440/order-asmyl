//Variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();


//Event listiner
eventListeners();
function eventListeners() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Read values from the form
        const webfor = document.getElementById('webfor').value;
       
        const age = document.getElementById('age').value;

        const work = document.getElementById('work').value;

        const available = document.getElementById('avail').value;

        const level = document.querySelector('input[name="level"]:checked').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const insurance = new Insurance(webfor, age, work, available,level);
        const price = insurance.calculateQuotation(insurance);
        const msg = ("Hey my name is "+name+" and my phone number is "+phone +" I will pay you R"+price+" to build my website");
        if( level==='order' ) {
            const btn = document.getElementById('btn');
            btn.style.backgroundColor='green';
            btn.style.color='white';
            btn.innerHTML='Place Order';
            window.alert("You are about to place an order.");

            if((name!='')&(phone!='')){
                Email.send({
                    Host : "smtp.mailtrap.io",
                    Username : "f30d83ab881340",
                    Password : "5ad1e528b47628",
                    To : 'aasimayile@gmail.com',
                    From : "aasimayile@gmail.com",
                    Subject : price+" "+name,
                    Body : msg
                }).then(
                      message => alert(message)
                );
            }
            else{
                window.alert("Fill in your name and phone number please.");
            }
            
       }
       else {
            // Clear the previous quotes
            const btn = document.getElementById('btn');
            btn.style.backgroundColor='yello';
            btn.style.color='black';
            btn.innerHTML='Get Quote';

            const prevResult = document.querySelector('#result div');
            if(prevResult != null) {
                 prevResult.remove();
            }
            // Make the quotation
            const insurance = new Insurance(webfor, age, work, available,level);
            const price = insurance.calculateQuotation(insurance);

            // Print the result from HTMLUI();
            html.showResults(price, insurance);
       }
       

    });

}




//Onjects

//Everything related to the quatation and calculations
function Insurance(webfor, age, work, available,level) {
    this.webfor = webfor;
    this.age = age;
    this.work = work;
    this.available = available;
    this.level=level;
}
//Calculate the price of the curent quotation
Insurance.prototype.calculateQuotation = function (insurance) {
    let price;
    const base = 1200;
   
    const webfor = insurance.webfor;
 
    switch (webfor) {
        case '1':
            price = base * 1;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.50;
            break;
        case '4':
            price = base * 2;
            break;
    }
    //get the year
    const age = insurance.age;
    switch (age) {
        case '1':
            price = base * 1;
            break;
        case '2':
            price = base * 1.35;
            break;
        case '3':
            price = base * 1.50;
            break;
        case '4':
            price = base * 1.55;
            break;
        case '5':
            price = base * 1.6;
            break;
    }
    const work = insurance.work;
    switch (work) {
        case '1':
            price = base * 0.95;
            break;
        case '2':
            price = base * 1.05;
            break;
    }
    const avail = insurance.available;
    switch (avail) {
        case '1':
            price = base * 1;
            break;
        case '2':
            price = base * 1.30;
            break;
        case '3':
            price = base * 1.01;
            break;
        case '4':
            price = base * 1.35;
            break;
        case '5':
            price = base * 1.8;
            break;
    }

    //check the level of protection
    return price;

}

// Adds the value based on the level of protection

//Everything related to the HTML 
function HTMLUI() { }
HTMLUI.prototype.sendQuote = function (price, insurance){}

//Prints the results to the HTMLUI
HTMLUI.prototype.showResults = function (price, insurance) {
    //Print the results
    const result = document.getElementById('result');

    //Create the div with the result
    const div = document.createElement('div');

    //Get the make of the quote.
    let webfor = insurance.webfor;
    let work = insurance.work;
    let age = insurance.age;
    let available = insurance.available;
    switch (work) {
        case '1':
            work = ' I work ';
            break;
        case '2':
            work = ' I do not work ';
            break;
    }
    switch (webfor) {
        case '1':
            webfor = ' I have matric ';
            break;
        case '2':
            webfor = ' I went to college or university ';
            break;
        case '3':
            webfor = ' I am an artist (music, drama, dance, visual) ';
            break;
        case '4':
            webfor = ' I have a business ';
            break;
        
    }
    switch (age) {
        case '1':
            age = ' 10 - 15 ';
            break;
        case '2':
            age = ' 16 - 20 ';
            break;
        case '3':
            age = ' 21 - 25 ';
            break;
        case '4':
            age = ' 26 - 30 ';
            break;
        case '5':
            age = ' 31+  ';
            break;
        
    }
    switch (available) {
        case '1':
            available = ' Whole Day ';
            break;
        case '2':
            available = ' 08:00 - 13:00 ';
            break;
        case '3':
            available = ' 14:00 - 17:00 ';
            break;
        case '4':
            available = ' 19:00 - 21:00 ';
            break;
        case '5':
            available = ' Weekends Only  ';
            break;
        
    }
    //Insert results to the section
    //div.innerHTML = 'Total: $' + price;
    div.innerHTML = `
    <div style="background-color:pink;color:black;"> 
        <h1 style="background-color:pink; border-style:solid; border-width:5px;">Your quote</h1>
        <p style="background-color:pink;color:black;margins:1%"> ${webfor}
        my age ranges between:${age} years and  
         ${work}. I am available ${available} every day or most days
          Please build me a portfolio website for R ${price}</p>

        <h2 style="background-color:pink;margin:1%;color:black;text-align:center">Quote : R ${price}</h2>
    </div>
    `;

  
    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';
    setTimeout(function () {
        spinner.style.display = 'none';
        //Insert this into the document
        result.appendChild(div);
    },2000);

}

