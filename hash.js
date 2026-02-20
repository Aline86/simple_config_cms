import bcrypt from "bcrypt";

const password = process.argv[2]; // mot de passe passé en argument
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) throw err;
  console.log(hash);
});
