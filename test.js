class Car {

    constructor(color){
        this.color = color;
    }
}


class MuscleCar extends Car {
    constructor(color, power) {
      this.power = power;
      super(color);
    }
  }

  const myCar = new MuscleCar('blue', '300HP')