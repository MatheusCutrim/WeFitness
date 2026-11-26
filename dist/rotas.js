const route = document.querySelector('.button-route');
const picker = document.querySelector('#map-picker');
const google = route.href;
const destination = encodeURIComponent(new URL(google).searchParams.get('destination'));
const android = /Android/i.test(navigator.userAgent);
const appleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

picker.querySelector('[data-map="google"]').href = google;
picker.querySelector('[data-map="waze"]').href = 'https://www.waze.com/ul?q=' + destination + '&navigate=yes';
const apple = picker.querySelector('[data-map="apple"]');
apple.href = 'https://maps.apple.com/?daddr=' + destination;
apple.hidden = !appleMobile;

if (android) route.href = 'geo:0,0?q=' + destination;
if ((android || appleMobile) && typeof picker.showModal === 'function') {
  route.addEventListener('click', event => {
    // Android handles the geo link. Leave a fallback if the in-app browser blocks it.
    if (appleMobile) event.preventDefault();
    picker.showModal();
  });
  picker.addEventListener('click', event => {
    if (event.target.closest('a')) picker.close();
  });
}
