var app = new Vue({
  el: '#app',
  data: {
    inGame: false,
    attacks: []
  },
  computed: {
    myHealth: function() {
      return 100 - this.attacks.reduce(
        function(a, b) { 
          if((b.attacker == 'player' && b.damage < 0) || (b.attacker == 'monster')) {
            return a + b.damage
          }
          else return a
        }, 0);
    },
    monsterHealth: function() {
      return 100 - this.attacks.reduce(
        function(a, b) { 
          if(b.attacker == 'player' && b.damage > 0) {
            return a + b.damage
          }
          else return a
        }, 0);
    }
  },
  methods: {
    startGame: function() {
      this.inGame = true
      this.attacks = []
    },
    attack: function(){
      this.atk('player', 0)
      this.atk('monster', 0)
      this.checkWinner()
    },
    specialAttack: function(){
      this.atk('player', 1)
      this.atk('monster', 0)
      this.checkWinner()
    },
    heal: function(){
      this.atk('player', 2)
      this.atk('monster', 0)
      this.checkWinner()
    },
    giveUp: function() {
      this.inGame = false
    },
    checkWinner: function(){
      console.log('checkin winner')
      if(this.myHealth < 0) {
        if(confirm('You lose buddy. Play again?')){
          this.startGame()
        } else {
           this.inGame = false
        }
      } else if (this.monsterHealth < 0) {
        if(confirm('Winner winner, chicken dinner. Play again?')){
          this.startGame()
        } else {
          this.inGame = false
        }
      }
    },
    atk: function(attacker, modifier){
      damage = Math.ceil(Math.random()*10)
      if(modifier > 0) {
        damage += 3
      }
      if(modifier > 1) {
        damage *= -1
      }
      this.attacks.push( {
        attacker: attacker,
        damage: damage
      })
    }
  }
})