Front End: 
- the project interface is displayed in the file 'Demo.jpg '
- project implements React-redux structure
- localStorage contains two objects:
    first object (array 'users') - contains the names of the users that are stored in the database (throw requ) 
    second object (array 'countries') - contains the names of the countries that are stored in the database 
- the main page contains a form with filters: country, user, and dates.
- when you click on the 'Send' button, the function returns results grouped by days: the number of successfully sent messages and the number of messages with an error. The results are displayed on the page.


Back End: 
- when the application starts, the database is filled with the initial values. There are four tables in the database.
- the function returns results grouped by days (Y-m-d)

Starting the Back end:
- saving the image from Git Repository. 
  Run through the command line from the folder where the image is located. 
  Launch by command: gradlew.bat bootRun