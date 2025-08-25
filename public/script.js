let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelector('section');
let navLinks = document.querySelector('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute;

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active')
            })
        }
    })
}


menuIcon.onClick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  let response = await fetch("/send", {
    method: "POST",
    body: formData
  });

  let result = await response.json();
  const status = document.getElementById("status");
  status.innerText = result.message;

  if (result.success) {
    status.style.color = "green";
    this.reset();
  } else {
    status.style.color = "red";
  }
});