import { readFileSync } from 'fs';
import { resolve } from 'path';

import jwt from 'jsonwebtoken';

export default (req, res) => {
  const { login, password } = req.body;
  const { users } = JSON.parse(readFileSync(resolve(__dirname, 'db.json')));
  console.log({ users });

  const user = users.find(user => user.login === login && user.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id }, 'jesiappsecret');
    res.json({ userID: user.id, token });
  } else {
    res.status(403).json({ error: 'authentication failed' });
  }
};
