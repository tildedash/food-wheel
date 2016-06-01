var spinning = false;

function getFirebase() {
  return new Firebase("https://food-wheel.firebaseio.com/foods");
}

function exists(name) {
  return false; //TODO
}

function isString(str) {
  return typeof str == 'string'
}

function addFood(name, type) {
  var fb = getFirebase();

  if( isString(name) && isString(type) ) {
    var name = name.trim();
    var type = type.trim();

    if (name.length > 0 && type.length > 0) {
      if (!exists(name)) {
        fb.push({
          name: name,
          type: type
        });
      }
    }
  }
  return true;
}

function showSpinButton(){
  $('button#spin').addClass('display');
}

function getFoods(callback) {
  var fb = getFirebase();
  fb.once("value", function(snapshot) {
    var foods = [];
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key();
      var childData = childSnapshot.val();
      foods.push(childData);
    });
    callback(foods);
  });
}

function listFoods(){
  getFoods(function (foods) {
    $.get('foods.mst', function(template) {
      var rendered = Mustache.render(template, {foods: foods});
      $('#foods').html(rendered);
      $('#wheel-data').html(rendered);
      showSpinButton();
    });
  });
}

function hideAllFoods() {
  $('#wheel-data li').removeClass("display");
}

function showFood(index) {
  $('#wheel-data li:eq('+index+')').addClass("display");
}

function spinFood(index, foodCount, spinCount, callback) {
  console.log("spinFoodd " + index + " " + foodCount + " " + spinCount );
  if (spinCount > 0) {
    hideAllFoods();
    showFood(index%foodCount);
    setTimeout(function() { spinFood(++index, foodCount, --spinCount, callback); }, 50 + (50 - spinCount) * 2);
  } else {
    callback();
  }
}

function spin(){
  $('#wheel-data').addClass('display');
  if(!spinning) {
    spinning = true;
    var foodCount = $('#wheel-data li').size();
    var random = Math.floor(Math.random() * foodCount);

    spinFood(0, foodCount, 50, function() {
      hideAllFoods();
      showFood(random);
      spinning = false;
    });
  }
}

listFoods();

$('button#spin').on('click', function(){
  spin();
});

$('input#submit').on('click', function(){
  var name = $('input#name').val();
  var type = $('input#type').val();

  addFood(name, type);
  location.reload();
});