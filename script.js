class Fighter {
  constructor(name, health, healthElement, fighterElement) {
    this.name = name;
    this.health = health;
    this.healthElement = healthElement;
    this.fighterElement = fighterElement;
  }

  takeDamage() {
    const damage = Math.floor(Math.random() * 20 + 5);
    this.health = Math.max(0, this.health - damage);
    this.updateHealthDisplay();
    return this.health <= 0;
  }

  updateHealthDisplay() {
    this.healthElement.textContent = `${this.name} Health: ${this.health}`;
  }

  punchAnimation() {
    this.fighterElement.classList.add('punching');
    setTimeout(() => this.fighterElement.classList.remove('punching'), 300);
  }
}

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const winnerText = document.getElementById('winner-text');

const fighter1 = new Fighter(
  'Putin',
  100,
  document.getElementById('health1'),
  document.getElementById('fighter1')
);

const fighter2 = new Fighter(
  'Trump',
  100,
  document.getElementById('health2'),
  document.getElementById('fighter2')
);

startBtn.onclick = () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
};

restartBtn.onclick = () => {
  location.reload();
};

document.querySelectorAll('.attack-btn').forEach(button => {
  button.addEventListener('click', () => {
    const attacker = button.dataset.target === '1' ? fighter2 : fighter1;
    const defender = button.dataset.target === '1' ? fighter1 : fighter2;

    attacker.punchAnimation();
    const defeated = defender.takeDamage();

    if (defeated) {
      gameScreen.style.display = 'none';
      gameOverScreen.style.display = 'block';
      winnerText.textContent = `${attacker.name} Wins!`;
    }
  });
});
