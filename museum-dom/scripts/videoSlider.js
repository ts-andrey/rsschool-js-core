/* ************    V I D E O   S L I D E R     ************** */
const allVideos = document.querySelectorAll('.videos >li');
const videoContainer = document.querySelector('.videos');
const videoArrows = document.querySelectorAll('.slider-position .arrow');
const videoPages = document.querySelectorAll('.slider-position .slide-page');
const videoIframes = document.querySelectorAll('.iframe');
let iframes = document.querySelectorAll('iframe');
const firstVideo = allVideos[0];
const lastVideo = allVideos[4];

let VIDEO_PAIGE = 1;
let MOVE_LEFT = true;
const IFRAMES = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
};
const VIDEO_PATH = {
  1: './assets/video/video3.webm',
  2: './assets/video/video1.webm',
  3: './assets/video/video2.webm',
  4: './assets/video/video4.webm',
  5: './assets/video/video0.webm',
};

function videoChangePicture(number) {
  VIDEO_PAIGE = number;
  videoRemoveActiveState();
  videoSetActiveState(VIDEO_PAIGE);
  allVideos.forEach(el => {
    el.style.marginLeft = `-${110 * (VIDEO_PAIGE - 1)}%`;
  });

  video.setAttribute('src', VIDEO_PATH[VIDEO_PAIGE]);
  setTimeout(() => {
    panelPlay.innerHTML = panelIconPlay;
    playBtn.style.display = 'block';
    video.currentTime = 0;
    panelProgressBar.value = 0;
  }, 100);
}
function videoRemoveActiveState() {
  videoPages.forEach(el => {
    el.childNodes[0].classList.remove('active');
  });
}
function videoSetActiveState(pageNumber) {
  videoPages[pageNumber - 1].childNodes[0].classList.add('active');
}

function videoPageClickHandler() {
  const number = Number(this.getAttribute('data-num'));
  if (VIDEO_PAIGE < number) MOVE_LEFT = true;
  else MOVE_LEFT = false;
  videoChangePicture(number);
}

function videoChangePageNumber(next) {
  if (VIDEO_PAIGE === 1 && next === 'left') {
    MOVE_LEFT = false;
    VIDEO_PAIGE = 5;
  } else if (VIDEO_PAIGE === 5 && next === 'right') {
    VIDEO_PAIGE = 1;
    MOVE_LEFT = true;
  } else {
    if (next === 'right') {
      MOVE_LEFT = true;
      VIDEO_PAIGE += 1;
    } else {
      MOVE_LEFT = false;
      VIDEO_PAIGE -= 1;
    }
  }
}

function videoArrowClickHandler() {
  const arrow = this.getAttribute('data-side');
  videoPages.forEach((el, index) => {
    if (el.childNodes[0].classList.contains('active')) return (VIDEO_PAIGE = ++index);
  });
  videoChangePageNumber(arrow);
  videoChangePicture(VIDEO_PAIGE);
}

// function renderVideoHandler() {
//   if (this.children.length > 1) {
//     if (this.classList.contains('first')) {
//       this.innerHTML = `
//     <iframe
//     width="560"
//     height="315"
//     src="https://www.youtube.com/embed/aWmJ5DgyWPI"
//     title="YouTube video player"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowfullscreen
//     loading="lazy"
//     ></iframe>
//         `;
//     } else if (this.classList.contains('second')) {
//       this.innerHTML = `
//     <iframe
//     width="560"
//     height="315"
//     src="https://www.youtube.com/embed/Vi5D6FKhRmo"
//     title="YouTube video player"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowfullscreen
//     loading="lazy"
//     ></iframe>
//           `;
//     } else if (this.classList.contains('third')) {
//       this.innerHTML = `
//       <iframe
//       width="560"
//       height="315"
//       src="https://www.youtube.com/embed/NOhDysLnTvY"
//       title="YouTube video player"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowfullscreen
//       loading="lazy"
//       ></iframe>
//         `;
//     } else if (this.classList.contains('fourth')) {
//       this.innerHTML = `
//       <iframe width="560" height="315" src="https://www.youtube.com/embed/2OR0OCr6uRE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//         `;
//     } else if (this.classList.contains('fifth')) {
//       this.innerHTML = `
//       <iframe width="560" height="315" src="https://www.youtube.com/embed/zp1BXPX8jcU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//         `;
//     }
//   }
// }
function renderVideoHandler() {
  videoIframes[0].innerHTML = `
      <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/aWmJ5DgyWPI"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      ></iframe>
    `;

  videoIframes[1].innerHTML = `
      <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Vi5D6FKhRmo"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      ></iframe>
    `;

  videoIframes[2].innerHTML = `
      <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/NOhDysLnTvY"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      ></iframe>
    `;

  videoIframes[3].innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/2OR0OCr6uRE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

  videoIframes[4].innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/zp1BXPX8jcU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

videoPages.forEach(el => {
  el.addEventListener('click', videoPageClickHandler);
});
videoArrows.forEach(el => {
  el.addEventListener('click', videoArrowClickHandler);
});

function iframeClickHandler() {
  console.log(this);
}

allVideos.forEach(el => {
  el.childNodes[0].addEventListener('click', iframeClickHandler);
});

// videoIframes.forEach(el => {
//   el.addEventListener('mouseover', renderVideoHandler);
// });
window.addEventListener('load', () => {
  setTimeout(renderVideoHandler(), 2000);
});
videoContainer.addEventListener('click', () => console.log(this), true);
