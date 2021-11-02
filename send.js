
const div = document.createElement('div');
div.innerHTML = `
    <div style="background-color:pink;color:black;"> 
        <h1 style="background-color:pink; border-style:solid; border-width:5px;">Your quote</h1>
        <p style="background-color:pink;color:black;margins:1%"> ${webfor}
        my age ranges between:${age} years and  
         ${work}. I am available ${available} every day or most days
          Please build me a portfolio website for R ${price}</p>

        <h2 style="background-color:pink;margin:1%;color:black;text-align:center">Total Quote : R ${price}</h2>
    </div>
    `;