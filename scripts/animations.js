// animations
document.getElementById('menu-button').addEventListener('click', function() {
    const menu = document.getElementById('main-menu');
    menu.classList.toggle('open');
});

document.getElementById('close-menu').addEventListener('click', function() {
    const menu = document.getElementById('main-menu');
    menu.classList.remove('open');
});

document.getElementById('upgrades-menu').addEventListener('click', function() {
  const mainMenu = document.getElementById('main-menu');
  const upgradesSubmenu = document.getElementById('upgrades-submenu');
  mainMenu.classList.remove('open');
  upgradesSubmenu.classList.add('open');
});

document.getElementById('back-to-main-menu').addEventListener('click', function() {
  const mainMenu = document.getElementById('main-menu');
  const upgradesSubmenu = document.getElementById('upgrades-submenu');
  upgradesSubmenu.classList.remove('open');
  mainMenu.classList.add('open');
});

document.getElementById('prestige-upgrades-menu').addEventListener('click', function() {
  const mainMenu = document.getElementById('main-menu');
  const prestigeSubmenu = document.getElementById('prestige-submenu');
  mainMenu.classList.remove('open');
  prestigeSubmenu.classList.add('open');
});

document.getElementById('back-to-main-menu-from-prestige').addEventListener('click', function() {
  const mainMenu = document.getElementById('main-menu');
  const prestigeSubmenu = document.getElementById('prestige-submenu');
  prestigeSubmenu.classList.remove('open');
  mainMenu.classList.add('open');
});


// falling image animation
function fallingImage() {
    const images = [
        "../files/poro1.png",
        "../files/poro2.png",
        "../files/poro3.png",
        "../files/poro4.png"
    ];
    // Create the falling image element
    const fallingImage = document.createElement("img");
    fallingImage.className = "falling-image";

    // Select a random image from the array
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingImage.src = randomImage;

    // Select a random horizontal position for the image to fall from
    const randomLeft = Math.random() * 80 + 10;
    fallingImage.style.left = `${randomLeft}%`;

    // Set initial position and animation
    fallingImage.style.position = 'absolute';
    fallingImage.style.top = '0';
    fallingImage.style.transition = 'top 4s linear';
    document.body.appendChild(fallingImage);

    // Animate the image falling
    setTimeout(() => {
        fallingImage.style.top = '100vh';
    }, 0);

    // Remove the image after it falls
    setTimeout(() => {
        fallingImage.remove();
    }, 4000);
}

const autoClickButton = document.getElementById("clicker-image");

autoClickButton.addEventListener("click", function() {
    fallingImage();
});

