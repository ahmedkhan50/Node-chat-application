class Person {
    constructor(name,age){
       this.name = name;
       this.age = age;
    }

    getUserDescription(){
        return this.name + ' ' + this.age;
    }
}

const me = new Person('ahmed',27);
console.log(me);
console.log(me.getUserDescription());