document.addEventListener('DOMContentLoaded', main);


function main() {
  const playBtn = document.querySelector('.playBtn')
  playBtn.addEventListener('click', handleClick);
}

async function handleClick(evt) {
  evt.preventDefault();
  const startValues = document.querySelector('#startValues').value;
  document.querySelector('.start').style.display="none";
}

