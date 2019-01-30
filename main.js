// this is a constructor
// takes as input: extElement is the span,
// words is the data-words attribute which is an array,
// wait is the amount that is waits before deleting
const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndext = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false

}

//Type method
TypeWriter.prototype.type = function() {
  // current index of word
  const current = this.wordIndext % this.words.length;
// get full text of current word
const fullTxt = this.words[current];
// check if deleting?
if(this.isDeleting){
  //remove char
  this.txt = fullTxt.substring(0, this.txt.length - 1);

} else {
  //add char
  this.txt = fullTxt.substring(0, this.txt.length + 1);
}

// insert txt into element
this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//initial Type Speed
let typeSpeed = 300;

if(this.isDeleting){
  typeSpeed /= 2;
}

//if word is complete
if(!this.isDeleting && this.txt === fullTxt){
  //make a pause at end
  typeSpeed = this.wait;
  //set delete as true
  this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  //move to next words
  this.wordIndext++;
  // pause for start typing
  typeSpeed = 500;

}
  setTimeout(() => this.type(), typeSpeed)
}
//init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// init app
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  //init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
