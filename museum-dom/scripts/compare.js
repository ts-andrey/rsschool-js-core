const imgComparer = document.querySelector('.comparer');
const imgContainer = document.querySelector('.explore .img');

console.log(imgComparer);

function handleDragStart(e) {
  this.style.opacity = '0.5';
}

function handleDragEnd(e) {
  this.style.opacity = '1';
}
function handleDrag(e) {
  const parentX = imgContainer.getBoundingClientRect().left;
  const itemX = imgComparer.getBoundingClientRect().left;
  // console.log(e);
  // console.log(e.clientX);
  // console.log(-e.offsetX );
  console.log(imgComparer.offsetLeft + e.offsetX);
  
}

imgComparer.addEventListener('dragstart', handleDragStart);
imgComparer.addEventListener('drag', handleDrag);
imgComparer.addEventListener('dragend', handleDragEnd);
