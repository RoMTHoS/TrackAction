const User = require("../models/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send({
      message: "Le champ email est requis",
      field: "email",
    });
  }
  if (!password) {
    return res.status(400).send({
      message: "Le champ password est requis",
      field: "password",
    });
  }
  if (password.length < 6) {
    return res.status(400).send({
      message: "Le champ password doit faire au moins 6 caractère",
      field: "password",
    });
  }
  //Une regex est un chaine de caractère qui permet de savoir si notre data correspond
  if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
    return res.status(400).send({
      message: "Le champ email est invalide",
      field: "email",
    });
  }

  const user = await User.findOne({
    email: email,
  })
    .select("+password")
    .exec();

  //console.log(user)
  if (!user) {
    return res.status(404).send({
      message: "user not found",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return res.send(user);
  } else {
    return res.status(401).send({
      message: "Email / Mot de passe incorrect",
    });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body; //J'éclate les quatres proporiétés de l'objet en quatres constantes
  //console.log(req.body);
  //si firstname indefined ou null = false
  if (!firstName) {
    return res.status(400).send({
      message: "Le champ firstName est requis",
      field: "firstName",
    });
  }
  if (!lastName) {
    return res.status(400).send({
      message: "Le champ lastName est requis",
      field: "lastName",
    });
  }
  if (!email) {
    return res.status(400).send({
      message: "Le champ email est requis",
      field: "email",
    });
  }
  if (!password) {
    return res.status(400).send({
      message: "Le champ password est requis",
      field: "password",
    });
  }
  if (password.length < 6) {
    return res.status(400).send({
      message: "Le champ password doit faire au moins 6 caractère",
      field: "password",
    });
  }
  //Une regex est un chaine de caractère qui permet de savoir si notre data correspond
  if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
    return res.status(400).send({
      message: "Le champ email est invalide",
      field: "email",
    });
  }
  // On veut trouver un utilisateur ou le champ email correspon à l'email du body
  const registered = await User.findOne({
    email: email,
  }).exec();

  if (registered) {
    return res.status(401).send({
      message: "Cet email est déjà rattaché à un compte",
      field: "email",
    });
  }

  console.log(password);
  //Un mot de passe crypté s'appelle un hash
  //premier arg le string a crypté et le deuxième c'est le sel qui correspond au nombre de fois qu'on va crypté (le cou)
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);

  const user = await User.create({
    email: email,
    password: hash,
    firstName: firstName,
    lastName: lastName,
  });

  delete user.passord; // Supprime de la constante user

  res.send(user);
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports = { login, register, getUsers };
