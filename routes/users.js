const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];


router.get("/",(req,res)=>{
  // res.send(users); using the one below to make the output more readable
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});
// GET by specific ID request: Retrieve a single user with lastName ID
router.get("/lastName/:lastName",(req,res)=>{
    const lastName = req.params.lastName;
    let filtered_lastName = users.filter((user) => user.lastName === lastName);
    res.send(filtered_lastName);
  });

  // Function to convert a date string in the format "dd-mm-yyyy" to a Date object
  function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm + "/" + dd);
}
// Define a route handler for GET requests to the "/sort" endpoint
// not working properly yet.
  router.get("/sort", (req,res)=>{
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    res.send(sorted_users);
  });


// POST request: Create a new user
router.post("/",(req,res)=>{
// Push a new user object into the users array based on query parameters from the request
  users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
  })
// Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!" )
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  if (filtered_users.length > 0){
    let filtered_user = filtered_users[0];
    // Extract and update DOB if provided
    let DOB = req.query.DOB;
    if (DOB) {
        filtered_user.DOB = DOB;
    }
    // Extract and update firstName if provided
    let namef = req.query.firstName;
    if (namef) {
        filtered_user.namef = firstName;
    }
    // Extract and update lastName if provided
    let namel = req.query.lastName;
    if (namel) {
        filtered_user.namel = lastName;
    }
    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    // Send success message indicating the user has been updated
    res.send(`user with the email ${email} updated`);
  } else {
    // Send error message if no user found
    res.send("unable to find user!");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  // Send a success message as the response, indicating the user has been deleted
  res.send(`user with the email ${email} deleted`)
});

module.exports=router;
