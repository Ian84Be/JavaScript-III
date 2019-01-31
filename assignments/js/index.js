class GameObject {
  constructor(att) {
    this.createdAt = att.createdAt;
  }
  destroy() {
    console.log(`*** ${this.name} was destroyed. ***`);
    // talkBox.textContent = `*** ${this.name} was destroyed. ***`;
    speakOut(`*** ${this.name} was destroyed. ***`)
  }
}

class CharacterStats extends GameObject {
  constructor(att) {
    super(att);
    this.totalHP = att.healthPoints;
    this.healthPoints = att.healthPoints;
    this.name = att.name;
  }
  hpMeter() {
  console.log(`/// ${this.name} ${this.healthPoints}/${this.totalHP}HP ///`);
  lifeMeter.textContent = `/// ${this.name} ${this.healthPoints}/${this.totalHP}HP ///`;
  }
}

class Humanoid extends CharacterStats {
  constructor(att) {
    super(att);
    this.weapons = att.weapons;
    this.language = att.language;
  }
  greet() {
    console.log(`${this.name} offers a greeting in ${this.language}`);
    // talkBox.textContent = `${this.name} offers a greeting in ${this.language}`;
    speakOut(`${this.name} offers a greeting in ${this.language}`)
  } 
}

  // HERO CONSTRUCTOR
class Hero extends Humanoid {
  constructor(att) {
    super(att);
  }
  attack(target) {
    console.log(`${this.name} attacks ${target.name}`);
    let roll = Math.floor(Math.random()*12+1);
    // console.log(`--- attack --- ${roll}`);
    if (roll > 9) {
      console.log(`!!! CRITICAL HIT !!!`);
      speakOut(`!!! CRITICAL HIT !!!`);
      roll*=2;
    }
    if (roll == 1) {
      console.log(`${target.name} dodges the attack!`);
      speakOut(`${target.name} dodges the attack!`);
      roll = 0;
    }
    target.healthPoints -= roll;
    console.log(`${this.name} deals ${roll} damage!`);
    speakOut(`${this.name} deals ${roll} damage!`);
    return (target.healthPoints > 0) ? target.hpMeter() : target.destroy();
  }
}

// THE LEGEND OF HYRULE
const link = new Hero({
  createdAt: new Date(),
  healthPoints: 30,
  name: 'Link',
  weapons: [
    'Master Sword',
    'Boomerang',
  ],
  language: 'silence',
});

// VILLIAN CONSTRUCTOR
class Villian extends Hero {
  constructor(att) {
    super(att);
  }
  taunt(target) {
    console.log(`${this.name} sneers and insults ${target.name}`);
    // talkBox.textContent = `${this.name} sneers and insults ${target.name}`;
    speakOut(`${this.name} sneers and insults ${target.name}`)
  }
  magicAttack(target) {
    let dmg = Math.floor(target.healthPoints * .5);
    target.healthPoints -= dmg;
    console.log(`${this.name} uses Dark Magic to attack!`);
    console.log(`${target.name} loses ${dmg}HP`);
    return (target.healthPoints > 0) ? target.hpMeter() : target.destroy();
  }
}

// EVIL WIZARD
const gannon = new Villian({
  createdAt: new Date(),
  healthPoints: 50,
  name: 'Gannondorf',
  weapons: [
    'Triforce of Power',
    'Dark Magic',
  ],
  language: 'English',
});



// BATTLE TO THE DEATH

// while (gannon.healthPoints > 0 && link.healthPoints > 0) {
//   let roll = Math.floor(Math.random()*12+1);
//   // console.log(`... time ... ${roll}`);
//   if (roll == 12) gannon.magicAttack(link);
//   else if (roll > 5 && roll < 12) link.attack(gannon);
//   else if (roll < 5 && roll > 1) gannon.attack(link);
//   else gannon.taunt(link);
// }

let talkBox = document.querySelector('.talk-box h2');
console.log(talkBox);
// TweenLite.to(talkBox, 0, {text:"This is the new text", ease:Linear.easeNone});

let lifeMeter = document.querySelector('.life-meter p');
// console.log(lifeMeter);

let dice = document.getElementById('dice');
// console.log(dice);

dice.addEventListener('click', ev => diceRoll());



function speakOut(string) {
  // let rollEase = 'Power4.easeOut';
  TweenLite.to(talkBox, 2, {text:string, ease:Power4.easeOut});
}


function diceRoll() {
  let roll = Math.floor(Math.random()*12+1);
  // let roll = 12;
  // talkBox.textContent = `ROLLED ${roll}`;
  console.log('roll');
  speakOut(`ROLLED ${roll}`)
  if (roll == 12) gannon.magicAttack(link);
  else if (roll > 5 && roll < 12) link.attack(gannon);
  else if (roll < 5 && roll > 1) gannon.attack(link);
  else gannon.taunt(link);
}



// gannon.greet();
// link.greet();