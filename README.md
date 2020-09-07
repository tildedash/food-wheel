# food-wheel
Get a random lunch idea (2 hours project)

Demo : https://food-wheel.firebaseapp.com/ (restaurants in the 9th arrondissement of Paris, near the Weroom HQ)

![demo](http://i.imgur.com/gDARtsB.png)

## How to create your own wheel

Clone the repo:

````
git clone git@github.com:tildedash/food-wheel.git
`````

Replace the _FIREBASE_URL_ in the file _script.js_ with your own firebase URL:


`````
var FIREBASE_URL = "https://<your firebase>.firebaseio.com/foods"
`````



If you replace _foods_ in the path, you will have to update the Firebase rules (R/W on your dataset and RO for everything else).

Update the firebase config file:

`````
{
  "projects": {
    "default": "<your project name>"
  }
}
`````

or run:

`````
rm .firebaserc

firebase login

firebase init
`````

Deploy on Firebase:

````
firebase deploy
`````

Enjoy!



