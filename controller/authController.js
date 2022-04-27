const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
/*
const user = {
  id: 45,
  name: "Romain",
  email: "romain.matheos.31@gmail.com",
  admin: "true",
};
*/
function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
}

function authentificateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 'Bearer akjhahvihsj' --> Supprimer l'espace et le Bearer qui est une convention de nommage pour les JWT

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
}

function refreshToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    //TODO : Check en BDD que le user existe toujours
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAccesToken(user);
    res.send({
      acccessToken: refreshedToken,
    });
  });
}

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
    const accessToken = generateAccesToken(user.toJSON());
    const refreshToken = generateRefreshToken(user.toJSON());
    return res.send({
      auth: {
        user,
        accessToken,
        refreshToken,
      },
    });
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

module.exports = {
  login,
  register,
  getUsers,
  generateAccesToken,
  generateRefreshToken,
  authentificateToken,
  refreshToken,
};
