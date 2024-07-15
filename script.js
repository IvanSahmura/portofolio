const nav = document.getElementById('mynav');

function navFixed() {
    if (window.scrollY > 0) {
        nav.classList.add('fixed-nav');
        nav.classList.remove('transparent-nav');
    } else {
        nav.classList.remove('fixed-nav');
        nav.classList.add('transparent-nav');
    }
}

window.addEventListener('scroll', navFixed);

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

setTimeout(function () {
    document.querySelector('.page1 p').classList.add('show-line');
}, 1000);

function hideAboutContent() {
    const title = document.querySelector('#page2 h1');
    if (title.classList.contains('fade-inH1')) {
        title.classList.remove('fade-inH1');
        title.classList.add('munculH1');
    }

    const aboutParagraph = document.querySelector('#page2 p');
    if (aboutParagraph.classList.contains('fade-in')) {
        aboutParagraph.classList.remove('fade-in');
        aboutParagraph.classList.add('muncul');
    }
}

function hideAboutContent2() {
    const title2 = document.querySelector('#page3 h1');
    if (title2.classList.contains('fade-inH1')) {
        title2.classList.remove('fade-inH1');
        title2.classList.add('munculH1');
    }

    const aboutParagraph2 = document.querySelector('#page3 p');
    if (aboutParagraph2.classList.contains('fade-in')) {
        aboutParagraph2.classList.remove('fade-in');
        aboutParagraph2.classList.add('muncul');
    }
}

function hideAboutContent3() {
    const title3 = document.querySelector('#page4 h1');
    if (title3.classList.contains('fadeIn4')) {
        title3.classList.remove('fadeIn4');
        title3.classList.add('muncul4');
    }
    const list = document.querySelector('#page4 ul');
    if (list.classList.contains('fadeInP4')) {
        list.classList.remove('fadeInP4');
        list.classList.add('munculP4');
    }
}

function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "header" : event.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            if (targetId === "#page2") {
                const title = targetElement.querySelector('h1');
                title.classList.remove('munculH1');
                title.classList.add('fade-inH1');
                const aboutParagraph = targetElement.querySelector('p');
                aboutParagraph.classList.remove('muncul');
                aboutParagraph.classList.add('fade-in');
            } else {
                hideAboutContent();
            }

            if (targetId === "#page3") {
                const title2 = targetElement.querySelector('h1');
                title2.classList.remove('munculH1');
                title2.classList.add('fade-inH1');
                const aboutParagraph2 = targetElement.querySelector('p');
                aboutParagraph2.classList.remove('muncul');
                aboutParagraph2.classList.add('fade-in');
            } else {
                hideAboutContent2();
            }

            if (targetId === "#page4") {
                const title3 = targetElement.querySelector('h1');
                title3.classList.remove('muncul4');
                title3.classList.add('fadeIn4');
                const list = targetElement.querySelector('ul');
                list.classList.remove('munculP4');
                list.classList.add('fadeInP4');

            } else {
                hideAboutContent3();
            }
        }
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

document.querySelector('.menu-button').addEventListener('click', showSidebar);
document.querySelector('.sidebar li:first-child').addEventListener('click', closeSidebar);

document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

const aboutSection = document.querySelector('#page2');
const options = {
    root: null,
    threshold: 0.1
};

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target.querySelector('h1');
            title.classList.remove('hiddenH1');
            title.classList.add('fade-inH1');
            const aboutParagraph = entry.target.querySelector('p');
            aboutParagraph.classList.remove('hidden');
            aboutParagraph.classList.add('fade-in');
        } else {
            hideAboutContent();
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, options);
observer.observe(aboutSection);

const aboutSection2 = document.querySelector('#page3');
const options2 = {
    root: null,
    threshold: 0.1
};

function handleIntersection2(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title2 = entry.target.querySelector('h1');
            title2.classList.remove('hiddenH1');
            title2.classList.add('fade-inH1');
            const aboutParagraph2 = entry.target.querySelector('p');
            aboutParagraph2.classList.remove('hidden');
            aboutParagraph2.classList.add('fade-in');
        } else {
            hideAboutContent2();
        }
    });
}

const observer2 = new IntersectionObserver(handleIntersection2, options2);
observer2.observe(aboutSection2);

const aboutSection3 = document.querySelector('#page4');
const options3 = {
    root: null,
    threshold: 0.1
};

function handleIntersection3(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title3 = entry.target.querySelector('h1');
            title3.classList.remove('muncul4');
            title3.classList.add('fadeIn4');
            const list = entry.target.querySelector('ul');
            list.classList.remove('munculP4');
            list.classList.add('fadeInP4');
        } else {
            hideAboutContent3();
        }
    });
}

const observer3 = new IntersectionObserver(handleIntersection3, options3);
observer3.observe(aboutSection3);
