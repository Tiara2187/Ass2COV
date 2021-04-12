const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  //register User
  static register(req, res, next) {
    const { username, email, password } = req.body

    User.create({
        email,
        password,
        username,
        townhall: username
    })
        .then((result) => {
            res.status(201).send({ success: true, data: result })
        })
        .catch(err => { res.status(500).send(err) })
}
  //login menggunakan Email dan Password

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({ email })
        .then(async (data) => {
            const isTrue = await bcrypt.compare(password, data.password)
            if (data && isTrue) {
                const payload = { id: data.id }
                const access_token = jwt.sign(payload, process.env.SECRET_KEY)
                if (!access_token) next({ name: 'NOT_FOUND' })
                res.status(200).send({ success: true, _id: data.id, access_token: access_token })
            } else next({ name: 'LOGIN_FAILED' })
        })
        .catch(err => { next({ name: 'NOT_FOUND' }) })
}

//get id user
static getOneUser(req, res, next) {
  const { userID } = req.params
  User.findById(userID)
      .then((result) => {
          res.status(200).send({ success: true, data: result })
      })
      .catch(next)
}

//update username dan townhall
static updateUser(req, res, next) {
  const { username, townhall } = req.body
  const { userID } = req.params

  const userUpdate = {
      username,
      townhall,
      updateAt: Date.now()
  }
  for (let i in userUpdate) {
      if (!userUpdate[i]) delete userUpdate[i]
  }

  User.findByIdAndUpdate(userID, userUpdate, { new: true })
      .then(result => {
          res.status(201).send({ message: 'Update success', data: result })
      })
      .catch(next)
}

//Attack
static async attackPlayer(req, res, next) {
  const { userID } = req.params;
  const { rivalID } = req.params;
  const { soldierattack } = req.body;
  const user = await User.findById(userID);
  const rival = await User.findById(rivalID);
  const { soliders, golds, foods } = user.resources;
  const { medal } = user;
  const medalRival = rival.medal;
  const rivalGold = rival.resources.golds;
  const rivalFood = rival.resources.foods;
  const soldierRival = rival.resources.soldiers;
  const arr = [];
  for (let i = 0; i < 3; i++) {
      arr.push(Math.random() < (soldierattack / (soldierRival + 1)));
  }
  const resultAttack = arr.filter(el => el).length;
  if (resultAttack >= 2) {
      if (soldierattack <= soldiers && soldierRival >= 50) {
          const successAttack = await User.findByIdAndUpdate(userID,
              { $set: { medal: medal + 5, 'resources.soldiers': soldiers - parseInt(soldierattack), 'resources.golds': golds + parseInt(rivalGold / 2), 
              'resources.foods': foods + parseInt(rivalFood / 2) } },
              { new: true }
          )
          const rivalUpdate = await User.findByIdAndUpdate(rivalID,
              { $set: { 'resources.soldiers': 0, 'resources.golds': rivalGold - parseInt(rivalGold / 2), 
              'resources.foods': rivalFood - parseInt(rivalFood / 2) } },
              { new: true }
          )
          res.status(200).send({ message: 'Attack Success, You Win', reward: { golds: rivalGold / 2, foods: rivalFood / 2, medal: 5 }, 
          resources: successAttack.resources, medal: successAttack.medal })
      } else next({ name: 'SOLDIER_RIVAL_LESS' })
  } else {
      const successAttack = await User.findByIdAndUpdate(userID,
          { $set: { medal: Math.floor(medal / 2), 'resources.soliders': soliders - parseInt(soldierattack) } },
          { new: true }
      )
      const rivalUpdate = await User.findByIdAndUpdate(rivalID,
          { $set: { medal: medalRival + 2, 'resources.soliders': soldierRival - 20 } },
          { new: true }
      )
      res.status(200).send({ message: 'Attack Success & You Lose, ', yourresources: successAttack.resources, medal: successAttack.medal })
  }
}

}

module.exports = UserController;
