        let baseSnaxPerClick = 1;
        let snaxPerClick = baseSnaxPerClick;
        let snaxPerSecond = 0;
        let snaxAmount = 0;
        let prestigeCurrency = 0;
        let prestiges = 0;  

        let upgrade1Level = 0;
        let upgrade2Level = 0;
        let upgrade3Level = 0;
        let upgrade4Level = 0;

        let upgrade1Price = 10;
        let upgrade2Price = 50;
        let upgrade3Price = 100;
        let upgrade4Price = 500;

        let pUpgrade1Price = 1;
        let pUpgrade2Price = 5;
        let pUpgrade3Price = 10;
        let pUpgrade1Multiplier = 1;
        let pUpgrade2Multiplier = 1;
        let pUpgrade3Multiplier = 1;
        
                    
        let pUpgrade1Level = 0; // Prestige Upgrade 1 level
        let pUpgrade2Level = 0; // Prestige Upgrade 2 level
        let pUpgrade3Level = 0; // Prestige Upgrade 3 level


        function calculateSnaxPerClick() {
            snaxPerClick = baseSnaxPerClick * pUpgrade1Multiplier;
            console.log(`Base Snax Per Click: ${baseSnaxPerClick}, Multiplier: ${pUpgrade1Multiplier}, Snax Per Click: ${snaxPerClick}`);
            return snaxPerClick; // Return the updated value for logging/debugging
        }
        
        function updateMetrics() {

            document.getElementById('snax-per-click').textContent = snaxPerClick * pUpgrade1Multiplier;
            document.getElementById('snax-per-second').textContent = snaxPerSecond;
            document.getElementById('snax-amount').textContent = snaxAmount;
            document.getElementById('prestige-currency').textContent = prestigeCurrency;
            document.getElementById('prestiges').textContent = prestiges;
            
            // Show prestige button if Snax amount is at least 100
            if (snaxAmount >= 10000) {
                document.getElementById('prestige-button').style.visibility = 'visible';
            } else {
            document.getElementById('prestige-button').style.visibility = 'hidden';
        }
        
        // Show prestige metrics and button if the player has prestiged at least once
        if (prestiges > 0) {
            document.getElementById('prestiges-container').style.visibility = 'visible';
            document.getElementById('prestige-points').style.visibility = 'visible';
            document.getElementById('prestige-upgrades-menu').style.visibility = 'visible';
        }
        
        // Update upgrade prices
        document.getElementById('Upgrade1').textContent = `Poro Power-Up (Level: ${upgrade1Level}, Price: ${upgrade1Price} Snax)`;
        document.getElementById('Upgrade2').textContent = `Braum's Shield Bash (Level: ${upgrade2Level}, Price: ${upgrade2Price} Snax)`;
        document.getElementById('Upgrade3').textContent = `Nunu's Winter Wonderland (Level: ${upgrade3Level}, Price: ${upgrade3Price} Snax)`;
        document.getElementById('Upgrade4').textContent = `Snax Avalanche (Level: ${upgrade4Level}, Price: ${upgrade4Price} Snax)`;
    
        // Enable or disable upgrade buttons based on Snax amount
        document.getElementById('Upgrade1').disabled = snaxAmount < upgrade1Price;
        document.getElementById('Upgrade2').disabled = snaxAmount < upgrade2Price;
        document.getElementById('Upgrade3').disabled = snaxAmount < upgrade3Price;
        document.getElementById('Upgrade4').disabled = snaxAmount < upgrade4Price;

        document.getElementById('PrestigeUpgrade1').textContent = `Anivia's Eternal Grace (Level: ${pUpgrade1Level}, Price: ${pUpgrade1Price})`;
        document.getElementById('PrestigeUpgrade2').textContent = `Ornn's Masterwork Forge (Level: ${pUpgrade2Level}, Price: ${pUpgrade2Price})`;
        document.getElementById('PrestigeUpgrade3').textContent = `Volibear's Thunderous Wrath (Level: ${pUpgrade3Level}, Price: ${pUpgrade3Price})`;
        

        document.getElementById('PrestigeUpgrade1').disabled = prestigeCurrency < pUpgrade1Price;
        document.getElementById('PrestigeUpgrade2').disabled = prestigeCurrency < pUpgrade2Price;
        document.getElementById('PrestigeUpgrade3').disabled = prestigeCurrency < pUpgrade3Price;

        
    }

    document.getElementById('clicker-image').addEventListener('click', function () {
        snaxAmount += snaxPerClick;
        console.log(`Clicked! Current Snax Per Click: ${snaxPerClick}`);
        updateMetrics();
    });

    setInterval(function() {
        snaxAmount += snaxPerSecond;
        updateMetrics();
    }, 1000);

        // Initial update
        updateMetrics();

        function applyUpgrade(upgrade) {
            // Standard upgrades
            if (upgrade === 'Upgrade1') {
                baseSnaxPerClick += 1; // Increase base snax per click
            } else if (upgrade === 'Upgrade2') {
                baseSnaxPerClick += 5; // Increase base snax per click significantly
            } else if (upgrade === 'Upgrade3') {
                snaxPerSecond += 10; // Add passive income
            } else if (upgrade === 'Upgrade4') {
                snaxPerSecond += 50; // Add large passive income
            }
        
            // Prestige upgrades
            if (upgrade === 'PrestigeUpgrade1') {
                pUpgrade1Multiplier += 1; // Increase multiplier for snax per click
            } else if (upgrade === 'PrestigeUpgrade2') {
                snaxPerSecond += 20; // Add additional passive income
            } else if (upgrade === 'PrestigeUpgrade3') {
                snaxPerSecond *= 2; // Double passive income rate
            }
        
            // Recalculate snax per click
            console.log(`Applying ${upgrade}, recalculating Snax per Click.`);
            calculateSnaxPerClick();
        
            // Refresh UI
            updateMetrics();
        }


    // Upgrade 1: Increase Snax per Click by 1
    document.getElementById('Upgrade1').addEventListener('click', function() {
        if (snaxAmount >= upgrade1Price) {
            snaxAmount -= upgrade1Price;
            upgrade1Level += 1;
            baseSnaxPerClick += 1;  // Increase the base value
            snaxPerClick = baseSnaxPerClick * pUpgrade1Multiplier;  
            console.log("Upgrade 1 purchased. New snaxPerClick:", snaxPerClick);    
            upgrade1Price = Math.floor(upgrade1Price * 1.4);
            applyUpgrade('Upgrade1');
            updateMetrics();
        }
    });

    // Upgrade 2: Increase Snax per Click by 5
    document.getElementById('Upgrade2').addEventListener('click', function() {
        if (snaxAmount >= upgrade2Price) {
            snaxAmount -= upgrade2Price;
            upgrade2Level += 1;
            baseSnaxPerClick += 5;  // Increase the base value
            snaxPerClick = baseSnaxPerClick * pUpgrade1Multiplier; // Recalculate snaxPerClick
            console.log("Upgrade 2 purchased. New snaxPerClick:", snaxPerClick);
            upgrade2Price = Math.floor(upgrade2Price * 1.5);
            applyUpgrade('Upgrade2');
            updateMetrics();
        }
    });

    // Upgrade 3: Increase Snax per Second by 10
    document.getElementById('Upgrade3').addEventListener('click', function() {
        if (snaxAmount >= upgrade3Price) {
            snaxAmount -= upgrade3Price;
            upgrade3Level += 1;
            snaxPerSecond += 10;
            upgrade3Price = Math.floor(upgrade3Price * 1.4);
            applyUpgrade('Upgrade3');
            updateMetrics();
        }
    });

    // Upgrade 4: Increase Snax per Second by 50
    document.getElementById('Upgrade4').addEventListener('click', function() {
        if (snaxAmount >= upgrade4Price) {
            snaxAmount -= upgrade4Price;
            upgrade4Level += 1;
            snaxPerSecond += 50;
            upgrade4Price = Math.floor(upgrade4Price * 1.5);
            applyUpgrade('Upgrade4');
            updateMetrics();
        }
    });

    function resetNormalUpgrades() {
        upgrade1Price = 10;
        upgrade2Price = 50;
        upgrade3Price = 100;
        upgrade4Price = 500;
        baseSnaxPerClick = 1;
    }


    document.getElementById('prestige-button').addEventListener('click', function() {
        if (snaxAmount >= 100) { // Threshold for prestiging
            prestiges++;
            prestigeCurrency += Math.floor(snaxAmount / 100) * pUpgrade3Multiplier;
            snaxAmount = 0;
            snaxPerClick = 1;
            snaxPerSecond = 0;
            resetNormalUpgrades();
            updateMetrics();    
        }
    });


    document.getElementById('PrestigeUpgrade1').addEventListener('click', function() {
        if (prestigeCurrency >= pUpgrade1Price) {
            prestigeCurrency -= pUpgrade1Price;
            pUpgrade1Level += 1;
            pUpgrade1Multiplier += 1; // Apply the multiplier directly to snaxPerClick
            console.log("Prestige Upgrade 1 purchased. New pUpgrade1Multiplier:", pUpgrade1Multiplier);
            pUpgrade1Price = Math.floor(pUpgrade1Price * 2);
            applyUpgrade('PrestigeUpgrade1');
            updateMetrics(); 
        }
    });

    document.getElementById('PrestigeUpgrade2').addEventListener('click', function() {
        if (prestigeCurrency >= pUpgrade2Price) {
            prestigeCurrency -= pUpgrade2Price;
            pUpgrade2Level += 1;
            pUpgrade2Multiplier += 4; 
            pUpgrade2Price = Math.floor(pUpgrade2Price * 1.5);
            applyUpgrade('PrestigeUpgrade2');
            updateMetrics(); 
        }
    });

    document.getElementById('PrestigeUpgrade3').addEventListener('click', function() {
        if (prestigeCurrency >= pUpgrade3Price) {
            prestigeCurrency -= pUpgrade3Price;
            pUpgrade3Level += 1;
            pUpgrade3Multiplier += 2; 
            pUpgrade3Price = Math.floor(pUpgrade3Price * 1.5);
            applyUpgrade('PrestigeUpgrade3');
            updateMetrics(); 
        }
    });

    document.getElementById('sign-up-button').addEventListener('click', function() {
        // Show sign-up form or redirect to sign-up page
    });
    
    document.getElementById('sign-in-button').addEventListener('click', function() {
        // Show sign-in form or redirect to sign-in page
    });

// Get the modals
var signUpModal = document.getElementById('sign-up-modal');
var signInModal = document.getElementById('sign-in-modal');

// Get the buttons that open the modals
var signUpBtn = document.getElementById('sign-up-button');
var signInBtn = document.getElementById('sign-in-button');

// Get the <span> elements that close the modals
var closeSignUp = document.getElementById('close-sign-up');
var closeSignIn = document.getElementById('close-sign-in');

// When the user clicks the button, open the modal
signUpBtn.onclick = function() {
    signUpModal.style.display = 'block';
    signInModal.style.display = 'none'; // Close the sign-in modal
  }
  
  signInBtn.onclick = function() {
    signInModal.style.display = 'block';
    signUpModal.style.display = 'none'; // Close the sign-up modal
  }

// When the user clicks on <span> (x), close the modal
closeSignUp.onclick = function() {
  signUpModal.style.display = 'none';
}

closeSignIn.onclick = function() {
  signInModal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == signUpModal) {
    signUpModal.style.display = 'none';
  }
  if (event.target == signInModal) {
    signInModal.style.display = 'none';
  }
}

document.getElementById('sign-up-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = document.getElementById('sign-up-username').value;
  const password = document.getElementById('sign-up-password').value;

  try {
      const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
          alert(`Account created successfully for ${username}!`);
          const signUpModal = document.getElementById('sign-up-modal');
          signUpModal.style.display = 'none';
      } else {
          const error = await response.text();
          alert(`Failed to create account: ${error}`);
      }
  } catch (err) {
      console.error('Error registering account:', err);
      alert('An error occurred while creating your account. Please try again.');
  }
});

function handleLogin(username) {
  // Update welcome message
  document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;

  // Show logout button
  document.getElementById('logout-button').style.display = 'block';

  // Hide sign-up and log-in buttons
  document.getElementById('sign-up-button').style.display = 'none';
  document.getElementById('sign-in-button').style.display = 'none';
}

// Handle logout
function handleLogout() {
  // Clear username and reset UI
  localStorage.removeItem('username');
  document.getElementById('welcome-message').textContent = 'Welcome, please register!';

  // Show sign-up and log-in buttons
  document.getElementById('sign-up-button').style.display = 'block';
  document.getElementById('sign-in-button').style.display = 'block';

  // Hide logout button
  document.getElementById('logout-button').style.display = 'none';
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  location.reload(); // Reload the page
}

// Check login state on page load
window.onload = function () {
  const username = localStorage.getItem('username');
  if (username) {
      handleLogin(username);
  }
};

// Add event listener for logout
document.getElementById('logout-button').addEventListener('click', handleLogout);

document.getElementById('save-game').addEventListener('click', async () => {
    console.log('Save button clicked');
    await saveGame();
});

async function saveGame() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
        console.error('No username or token found');
        alert('Please log in to save your game');
        return;
    }

    const gameState = {
        snaxAmount,
        prestigeCurrency,
        prestiges,
        baseSnaxPerClick,
        pUpgrade1Multiplier,
        snaxPerClick,
        snaxPerSecond,
        upgrades: {
            Upgrade1: { level: upgrade1Level, price: upgrade1Price },
            Upgrade2: { level: upgrade2Level, price: upgrade2Price },
            Upgrade3: { level: upgrade3Level, price: upgrade3Price },
            Upgrade4: { level: upgrade4Level, price: upgrade4Price },
        },
        prestigeUpgrades: {
            PrestigeUpgrade1: { level: pUpgrade1Level, price: pUpgrade1Price },
            PrestigeUpgrade2: { level: pUpgrade2Level, price: pUpgrade2Price },
            PrestigeUpgrade3: { level: pUpgrade3Level, price: pUpgrade3Price },
        },
    };

    console.log('Attempting to save gameState:', gameState);

    try {
        const response = await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ username, gameState }),
        });

        const resultText = await response.text();
        console.log('Save Response:', response.status, resultText);

        if (response.ok) {
            alert('Game state saved successfully!');
        } else {
            alert(`Failed to save game state: ${resultText}`);
        }
    } catch (err) {
        console.error('Error saving game state:', err);
        alert('An error occurred while saving your game.');
    }
}

async function loadGame(username, token) {
    try {
        const response = await fetch(`http://localhost:3000/load/${username}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
            const gameState = await response.json();

            console.log('Loaded GameState:', gameState);

            // Restore all variables with safe defaults
            snaxAmount = gameState.snaxAmount ?? 0;
            prestigeCurrency = gameState.prestigeCurrency ?? 0;
            prestiges = gameState.prestiges ?? 0;
            baseSnaxPerClick = gameState.baseSnaxPerClick ?? 1;
            pUpgrade1Multiplier = gameState.pUpgrade1Multiplier ?? 1;
            snaxPerClick = gameState.snaxPerClick ?? baseSnaxPerClick * pUpgrade1Multiplier;
            snaxPerSecond = gameState.snaxPerSecond ?? 0;

            const upgrades = gameState.upgrades ?? {};
            upgrade1Level = upgrades.Upgrade1?.level ?? 0;
            upgrade1Price = upgrades.Upgrade1?.price ?? 10;
            upgrade2Level = upgrades.Upgrade2?.level ?? 0;
            upgrade2Price = upgrades.Upgrade2?.price ?? 50;
            upgrade3Level = upgrades.Upgrade3?.level ?? 0;
            upgrade3Price = upgrades.Upgrade3?.price ?? 100;
            upgrade4Level = upgrades.Upgrade4?.level ?? 0;
            upgrade4Price = upgrades.Upgrade4?.price ?? 500;

            const prestigeUpgrades = gameState.prestigeUpgrades ?? {};
            pUpgrade1Level = prestigeUpgrades.PrestigeUpgrade1?.level ?? 0;
            pUpgrade1Price = prestigeUpgrades.PrestigeUpgrade1?.price ?? 1;
            pUpgrade2Level = prestigeUpgrades.PrestigeUpgrade2?.level ?? 0;
            pUpgrade2Price = prestigeUpgrades.PrestigeUpgrade2?.price ?? 5;
            pUpgrade3Level = prestigeUpgrades.PrestigeUpgrade3?.level ?? 0;
            pUpgrade3Price = prestigeUpgrades.PrestigeUpgrade3?.price ?? 10;

            calculateSnaxPerClick();
            updateMetrics();
            alert('Progress loaded successfully!');
        } else {
            alert('Failed to load progress.');
        }
    } catch (err) {
        console.error('Error loading game state:', err);
        alert('An error occurred while loading your progress.');
    }
}   

document.getElementById('sign-in-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = document.getElementById('sign-in-username').value;
  const password = document.getElementById('sign-in-password').value;

  try {
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('username', username);
          localStorage.setItem('token', token);

          alert(`Logged in successfully as ${username}!`);
          handleLogin(username);

          // Load the user's progress immediately after login
          await loadGame(username, token);

          document.getElementById('sign-in-modal').style.display = 'none';
      } else {
          alert('Invalid username or password.');
      }
  } catch (err) {
      console.error('Error logging in:', err);
      alert('An error occurred. Please try again.');
  }
}); 


document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    alert('You have been logged out successfully.');
    document.getElementById('welcome-message').textContent = 'Welcome, please register!';

    location.reload();

    handleLogout();
});


document.getElementById('load-game').addEventListener('click', async function () {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  if (!username || !token) {
      alert('Please log in first.');
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/load/${username}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      if (response.status === 403) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          handleLogout(); // Redirect or reset UI
          return;
      }

      if (response.ok) {
          const gameState = await response.json();

          // Update game variables
          snaxAmount = gameState.snaxAmount;
          prestigeCurrency = gameState.prestigeCurrency;
          prestiges = gameState.prestiges;

          const upgrades = gameState.upgrades;
          upgrade1Level = upgrades.Upgrade1.level;
          upgrade1Price = upgrades.Upgrade1.price;
          upgrade2Level = upgrades.Upgrade2.level;
          upgrade2Price = upgrades.Upgrade2.price;
          upgrade3Level = upgrades.Upgrade3.level;
          upgrade3Price = upgrades.Upgrade3.price;
          upgrade4Level = upgrades.Upgrade4.level;
          upgrade4Price = upgrades.Upgrade4.price;

          const prestigeUpgrades = gameState.prestigeUpgrades;
          pUpgrade1Level = prestigeUpgrades.PrestigeUpgrade1.level;
          pUpgrade1Price = prestigeUpgrades.PrestigeUpgrade1.price;
          pUpgrade2Level = prestigeUpgrades.PrestigeUpgrade2.level;
          pUpgrade2Price = prestigeUpgrades.PrestigeUpgrade2.price;
          pUpgrade3Level = prestigeUpgrades.PrestigeUpgrade3.level;
          pUpgrade3Price = prestigeUpgrades.PrestigeUpgrade3.price;

          updateMetrics();
          alert('Game state loaded successfully!');
      } else {
          alert('Failed to load game state.');
      }
  } catch (err) {
      console.error('Error loading game state:', err);
  }
});