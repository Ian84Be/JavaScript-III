/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
*/
function GameObject(att) {
    this.createdAt = att.createdAt;
    this.dimensions = att.dimensions;
}
GameObject.prototype.destroy = function() {
  console.log(`*** ${this.name} was destroyed. ***`); 
}

/*
  === CharacterStats ===
*/
function CharacterStats(att) {
  this.totalHP = att.healthPoints;
  this.healthPoints = att.healthPoints;
  this.name = att.name;
  GameObject.call(this, att);
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() {
  console.log(`${this.name} took damage.`);
}
// HP METER
CharacterStats.prototype.hpMeter = function() {
  console.log(`/// ${this.name} has ${this.healthPoints}/${this.totalHP}HP ///`);
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
*/
function Humanoid(att) {
  this.team = att.team;
  this.weapons = att.weapons;
  this.language = att.language;
  CharacterStats.call(this, att);
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  console.log(`${this.name} offers a greeting in ${this.language}`);
} 

// Test you work by un-commenting these 3 objects and the list of console logs below:


  // const mage = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 2,
  //     width: 1,
  //     height: 1,
  //   },
  //   healthPoints: 5,
  //   name: 'Bruce',
  //   team: 'Mage Guild',
  //   weapons: [
  //     'Staff of Shamalama',
  //   ],
  //   language: 'Common Tongue',
  // });

  // const swordsman = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 2,
  //     width: 2,
  //     height: 2,
  //   },
  //   healthPoints: 15,
  //   name: 'Sir Mustachio',
  //   team: 'The Round Table',
  //   weapons: [
  //     'Giant Sword',
  //     'Shield',
  //   ],
  //   language: 'Common Tongue',
  // });

  // const archer = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 1,
  //     width: 2,
  //     height: 4,
  //   },
  //   healthPoints: 10,
  //   name: 'Lilith',
  //   team: 'Forest Kingdom',
  //   weapons: [
  //     'Bow',
  //     'Dagger',
  //   ],
  //   language: 'Elvish',
  // });

  // console.log(mage.createdAt); // Today's date
  // console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  // console.log(swordsman.healthPoints); // 15
  // console.log(mage.name); // Bruce
  // console.log(swordsman.team); // The Round Table
  // console.log(mage.weapons); // Staff of Shamalama
  // console.log(archer.language); // Elvish
  // console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  // console.log(mage.takeDamage()); // Bruce took damage.
  // console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch
  // HERO CONSTRUCTOR
function Hero(att) {
  Humanoid.call(this, att);
}
Hero.prototype = Object.create(Humanoid.prototype);

// HERO ATTACK START
Hero.prototype.attack = function(target) {
  console.log(`${this.name} attacks ${target.name}`);
  // ROLL A 12 SIDED DIE
  let roll = Math.floor(Math.random()*12+1);
  // console.log(`--- attack --- ${roll}`);
  
  if (roll > 9) {
    console.log(`!!! CRITICAL HIT !!!`);
    roll*=2;
  }

  // FINISH ATTACK
  target.healthPoints -= roll;
  console.log(`${this.name} deals ${roll} damage!`);
  return (target.healthPoints > 0) ? target.hpMeter() : target.destroy();
}

// THE LEGEND OF HYRULE
const link = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 30,
  name: 'Link',
  team: 'Hyrule',
  weapons: [
    'Master Sword',
    'Boomerang',
  ],
  language: 'silence',
});

// VILLIAN CONSTRUCTOR
function Villian(att) {
  Hero.call(this, att);
}
Villian.prototype = Object.create(Hero.prototype);

// EVIL WIZARD
const gannon = new Villian({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 4,
    height: 9,
  },
  healthPoints: 50,
  name: 'Gannondorf',
  team: 'Gerudo',
  weapons: [
    'Triforce of Power',
    'Dark Magic',
  ],
  language: 'English',
});
Villian.prototype.taunt = function(target) {
  console.log(`${this.name} sneers and insults ${target.name}.`);
};
// EVIL MAGIC ATTACK
Villian.prototype.magicAttack = function(target) {
  let dmg = Math.floor(target.healthPoints * .5);
  target.healthPoints -= dmg;
  console.log(`${this.name} uses Dark Magic to attack!`);
  console.log(`${target.name} loses ${dmg}HP`);
  return (target.healthPoints > 0) ? target.hpMeter() : target.destroy();
};


gannon.greet();
link.greet();
// gannon.magicAttack(link);
// gannon.magicAttack(link);

// BATTLE TO THE DEATH

while (gannon.healthPoints > 0 && link.healthPoints > 0) {
  let roll = Math.floor(Math.random()*12+1);
  console.log(`... time ... ${roll}`);
  if (roll == 12) gannon.magicAttack(link);
  else if (roll > 5) link.attack(gannon);
  else if (roll < 5 && roll > 2) gannon.attack(link);
  else gannon.taunt(link);
}