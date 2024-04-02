var greeting = function (user) {
    console.log("Hello ".concat(user.name));
};
var user = { id: 1, name: "Vasya", username: "Nik", email: "vasya@gmail.com", phone: "0963646564", address: { street: 'green', city: "Lviv", suite: "hdj", zipcode: "12334", geo: { lat: '2e2e2', lng: '23232' } }, company: { name: 'JBC' }, website: 'http:www.ddjdj', data: [1, 2, 3, 4, 5], house: 3 };
greeting(user);
