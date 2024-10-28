document.addEventListener("DOMContentLoaded", function() {
    splitTextIntoSpans(".logo p");
    splitTextIntoSpans(".hero-copy h1");

    

    if (typeof emailjs !== "undefined") {
        emailjs.init('bzZQ0f3FnGFJyxIR_'); 
        console.log("EmailJS initialized");
    } else {
        console.error("EmailJS SDK not loaded");
    }

    gsap.to(".img-holder img", {
        left: 0,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 4,
    });

    gsap.to("img-holder img", {
        left: "100%",
        stagger: -0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 7,
    });

});

const growingHr = document.getElementById('growing-hr');


window.addEventListener('scroll', () => {
  
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / docHeight;

  
  const newWidth = Math.min(scrollFraction * 200, 100); 
  growingHr.style.width = `${newWidth}%`;
});




function splitTextIntoSpans(selector){
    var element = document.querySelector(selector);
    if (element) {
        var text = element.innerText;
        var splitText = text.split("").map((char) => `<span>${char}</span>`)
        .join("");
        element.innerHTML = splitText;
    }
}

function startLoader(){
    var counterElement = document.querySelector(".counter p");
    var logoElement = document.querySelector(".logo p");
    var currentValue = 0;

    function updateCounter(){
        if (currentValue === 100) {
            animateText();
            return;
        }

        currentValue += Math.floor(Math.random()*10) + 1;
        currentValue = currentValue > 100 ? 100 : currentValue;
        counterElement.innerHTML = currentValue.toString().split("").map((char) => `<span>${char}</span>`).join("") + "<span>%</span>";

        var delay = Math.floor(Math.random()*200) + 100;
        setTimeout(updateCounter, delay);
    }

    function animateText() {
        setTimeout(() => {
            gsap.to(".counter p span", {
                top: "-400px",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
            });

            gsap.to(".logo p span", {
                top: "0",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
            });

            gsap.to(".logo p span", {
                top: "-400px",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
                delay: 3,
            });

            gsap.to(".overlay", {
                opacity: 0,
                ease: "power3.inOut",
                duration: 1,
                delay: 4,
            });

            gsap.to(".hero img", {
                scale: 1,
                ease: "power3.inOut",
                duration: 2,
                delay: 3.5,
            });

            gsap.to(".hero-copy h1 span", {
                top: "0",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 2,
                delay: 4,
            });

            gsap.to("nav", {
                top: "0",
                ease: "power3.inOut",
                duration: 2,
                delay: 4,
            });
        }, 300);
    }

    updateCounter();
}

startLoader();



const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault(); 

    if (typeof emailjs === "undefined") {
        console.error("EmailJS is not defined");
        contactMessage.textContent = 'EmailJS not loaded ❌';
        return;
    }

    emailjs.sendForm('service_7rrkbfl', 'template_7neulza', '#contact-form', 'bzZQ0f3FnGFJyxIR_')
        .then(() => {
            contactMessage.textContent = 'Message sent successfully ✅';
            setTimeout(() => { contactMessage.textContent = ''; }, 5000);
            contactForm.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            contactMessage.textContent = 'Message not sent (service error) ❌';
        });
};


contactForm.addEventListener('submit', sendEmail);

