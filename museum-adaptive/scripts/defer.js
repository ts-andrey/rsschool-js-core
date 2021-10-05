function deferIframe() {
  const iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    if (iframes[i].getAttribute('data-src')) {
      iframes[i].setAttribute('src', iframes[i].getAttribute('data-src'));
    }
  }
}
window.addEventListener('load', deferIframe);
