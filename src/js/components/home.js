import { select, templates, classNames } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.render(element);
    thisHome.initLink();
  }

  render(element) {
    const thisHome = this;
    const generatedHTML = templates.home();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }

  clickedPage(pageId) {
    const thisHome = this;
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
      for (let link of thisHome.navLinks) {
        link.classList.toggle(
          classNames.nav.active,
          link.getAttribute('href') == '#/' + pageId
        );
      }
    }
  }

  initLink() {
    const thisHome = this;
    thisHome.links = document.querySelectorAll('.link');

    for (let link of thisHome.links) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedLink = this;
        /* get page id from href attribute */
        const idLink = clickedLink.getAttribute('href').replace('#', '');
        /* run thisHome.clickedPage with that id */
        thisHome.clickedPage(idLink);
      });
    }
  }
}
export default Home;