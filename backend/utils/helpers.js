import bcrypt from 'bcrypt';

const rounds = 3;

const hashPasswd = (password) => {
    const salt = bcrypt.genSaltSync(rounds);
    console.log(salt);
    return bcrypt.hashSync(password, salt);
};

export {
    hashPasswd,
}