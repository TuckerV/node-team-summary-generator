
function header(cards){

return `<!doctype html>
<html lang="en">
  <head>
    <title>Team Summary</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>
  <body>
      <div class="jumbotron jumbotron-fluid bg-dark text-light">
          <div class="container">
              <h1 class="display-3">Meet the Team</h1>
              <p class="lead">Application by Tucker</p>
              <hr class="my-2 bg-light">
          </div>
      </div>
    </br>
      <div class="container">
          <div class="row" id="teamSummaries">
            ${cards}
          </div>
      </div>
  </body>
</html>` ;

}

function employeeCard(person) {
    
    let roleInfo;

    if(person.getRole() === "Intern") {
        roleInfo = `School: ${person.getSchool()}`
    } 
    else if (person.getRole() === "Engineer") {
        roleInfo = `Github: ${person.getGithub()}`
    } 
    else if (person.getRole() === "Manager") {
        roleInfo = `Office: ${person.getOfficeNumber()}`
    }
    else {
        console.log("Sorry, but you must choose an existing role");
    }
    return `<div class="col-sm-4">
    <div class="card">
        <div class="bg-dark text-light card-header">
            <h3>${person.getName()}</h3>
            <h5>${person.getRole()} </h5>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${person.getId()}</li>
                <li class="list-group-item">EMAIL: ${person.getEmail()}</li>
                <li class="list-group-item">${roleInfo}</li>
            </ul>
        </div>
    </div>
</div>`;

}

module.exports = {
    header: header,
    employeeCard: employeeCard
};