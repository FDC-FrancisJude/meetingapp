let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if(child){
      document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id

  for(let i = 0; videoFrames.length > i; i++){
    if(videoFrames[i].id != userIdInDisplayFrame){
      videoFrames[i].style.height = '100px'
      videoFrames[i].style.width = '100px'
    }
  }

}

for(let i = 0; videoFrames.length > i; i++){
  videoFrames[i].addEventListener('click', expandVideoFrame)
}


let hideDisplayFrame = () => {
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)

    for(let i = 0; videoFrames.length > i; i++){
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
  }
}

displayFrame.addEventListener('click', hideDisplayFrame)


$("#darkModeSwitch").click(function(){
  var hasClassDark = $("#darkModeSwitch").prop('checked') ? true : false;

  sessionStorage.setItem('darkmode', hasClassDark);
  setTheme()
  
});

document.addEventListener('DOMContentLoaded', () => {
  setTheme()
});

function setTheme() {
  var darkmode = sessionStorage.getItem('darkmode') ? sessionStorage.getItem('darkmode') : true;
  console.log(darkmode);
  
  $('#darkModeSwitch').prop('checked', darkmode == 'true' ? true : false);
  $("body").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1a1a1a", color:"#f9f9f9"} : {background:"#f9f9f9", color:"#202225"}
  );
  $("header").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1a1a1a", color:"#f9f9f9"} : {background:"#8a0000", color:"#202225"}
  );
  $("#members__header").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#323143", color:"#f9f9f9"} : {background:"#c2c2c2", color:"#202225"}
  );
  $("#members__count").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1d1d1c", color:"#f9f9f9"} : {background:"#c2c2c2", color:"#202225"}
  );
  $("#member__list").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1d1d1c", color:"#f9f9f9"} : {background:"#e6e6e6", color:"#202225"}
  );
  $("#members__container").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1d1d1c", color:"#f9f9f9"} : {background:"#e6e6e6", color:"#202225"}
  );
  $("#messages__container").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#1d1d1c", color:"#f9f9f9"} : {background:"#e6e6e6", color:"#202225"}
  );
  $(".message__body").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#363739", color:"#f9f9f9"} : {background:"#c2c2c2", color:"#202225"}
  );
  $("#message__form").toggleClass("dark")
  .css(
          darkmode == 'true' ?
      {background:"#363739", color:"#f9f9f9"} : {background:"#c2c2c2", color:"#202225"}
  );

  $("input").toggleClass("dark")
		.css(
            darkmode == 'true' ?
		  	{background:"#3f434a", color:"#f9f9f9"} : {background:"#FFF", color:"#202225"}
		);
  $("#stream__box").toggleClass("dark")
		.css(
            darkmode == 'true' ?
		  	{background:"#3f434a", color:"#f9f9f9"} : {background:"#FFF", color:"#202225"}
		);
}