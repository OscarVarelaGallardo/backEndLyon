const generateToken = () => {
    const id = Math.random().toString(32).substr(2);
    const date = Date.now().toString(32);
    return id + date;
}


export default generateToken;