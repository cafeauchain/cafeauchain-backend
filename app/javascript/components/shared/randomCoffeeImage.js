const randomCoffeeImage = () => {
    let min = 1;
    let max = 23;
    let val = Math.floor(Math.random() * (max - min)) + min;
    // eslint-disable-next-line
    return require("images/coffee-imgs/coffee-img-" + val + ".jpg");
};

export default randomCoffeeImage;
