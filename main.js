const imgDir = "images/farm%20animals/";
const imgNaming = "animal"
const arrayLength = 24;
const imageArray = [], sessionStorageArray = [];

let baseRating = 1000;
const k = 32; // K-factor for Elo rating system

// Get a random item from the array
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return imageArray[randomIndex];
}

// Get img name without extension from element src
function getImgName(url) {
  const lastIndex = url.lastIndexOf('/');
  if (lastIndex !== -1) {
    return url.substring(lastIndex + 1);
  }
  return url;
}

// elo rating formula in chess
function probability(leftRating, rightRating){
  return 1.0*1.0/(1+1.0*Math.pow(10, 1.0*(leftRating-rightRating)/400));
}

function eloRating(leftRating, rightRating, k, win){
  let leftProb = probability(leftRating, rightRating); // left win probability
  let rightProb = probability(rightRating, leftRating); // right win probability
  if (win) { // left wins, right chosen
    leftRating = leftRating + k * (1 - rightProb); // add left rating
    rightRating = rightRating + k * (0 - leftProb); // minus right rating
  } else { // right wins. left chosen
    rightRating = rightRating + k * (1 - leftProb); // add  right rating
    leftRating = leftRating + k * (0 - rightProb); // minus left rating
  }
  return { leftRating, rightRating };
}

// update session value and get new image
function updateEloAndDisplay(leftWin) {
  var leftImage = document.getElementById("leftImg");
  var leftImgName = getImgName(leftImage.src);
  
  var rightImage = document.getElementById("rightImg");
  var rightImgName = getImgName(rightImage.src);

  const storedLeft = sessionStorage.getItem(leftImgName);
  const storedRight = sessionStorage.getItem(rightImgName);
  
  if (storedLeft == null) {
    sessionStorage.setItem(leftImgName, baseRating);
  } 

  if (storedRight == null) {
    sessionStorage.setItem(rightImgName, baseRating);
  }

  const leftRating = parseFloat(sessionStorage.getItem(leftImgName));
  const rightRating = parseFloat(sessionStorage.getItem(rightImgName));
  
  const result = eloRating(leftRating, rightRating, k, leftWin);

  // Update the Elo ratings for the next round
  sessionStorage.setItem(leftImgName, result.leftRating);
  sessionStorage.setItem(rightImgName, result.rightRating);

  // Change the images based on the winner
  if (leftWin) {
    do {
      leftImageSource = imgDir + getRandomItem(imageArray);
    } while (leftImageSource === rightImage.src);
    leftImage.src = leftImageSource;
  } else {
    do {
      rightImageSource = imgDir + getRandomItem(imageArray);
    } while (rightImageSource === leftImage.src);
    rightImage.src = rightImageSource;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Populate the array with filenames
  for (let i = 1; i <= arrayLength; i++) {
    var img = imgNaming + ` (${i}).jpg`;
    imageArray.push(img);
    sessionStorage.setItem(img, baseRating);
  }
  let leftImg, rightImg;
  // Ensure leftImg and rightImg are not the same
  do {
    leftImg = getRandomItem(imageArray);
    rightImg = getRandomItem(imageArray);
  } while (leftImg === rightImg);

  // Get the img elements
  const leftImgElement = document.getElementById('leftImg');
  const rightImgElement = document.getElementById('rightImg');

  // Set the src attribute of the img tags with random images
  leftImgElement.src = imgDir + leftImg
  rightImgElement.src = imgDir + rightImg
});

// left wins, right loses
function clickLeft() { 
  updateEloAndDisplay(true);
}

// right wins, left loses
function clickRight() { 
  updateEloAndDisplay(false);
}



