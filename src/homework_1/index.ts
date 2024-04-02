const greeting = (user:IUser<number>): void => {
    console.log(`Hello ${user.name}`);
}

interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}



interface IUser<T> {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: {
        name: string
    },
    data: T[],
    house?: number
}

const user:IUser<number> = {id:1,name: "Vasya", username:"Nik", email: "vasya@gmail.com", phone:"0963646564",address:{street:'green',city:"Lviv",suite:"hdj",zipcode:"12334",geo:{lat:'2e2e2',lng:'23232'}},company:{name:'JBC'},website:'http:www.ddjdj',data:[1,2,3,4,5],house:3};

greeting(user) ;