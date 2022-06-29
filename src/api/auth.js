import { Router } from "express";
import { Auth } from '../../models';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const salt = 12;

const router=Router();

// 회원가입
router.post('/register', async(req, res) => {
    const email = req.body.email;
    let password = req.body.password;
  
    const authLst = await Auth.findAll({
      where: { email: email }
    });
  
    if (authLst.length!==0){
      return res.json({
        error: "이미 존재하는 이메일입니다."
      });
    }
    password = await bcrypt.hash(password, salt);
    
    const authLst1 = await Auth.create({
      email: email,
      password: password
    });
    res.send({
      data:{
        user:{
          id:authLst1.id
        }
      }
    })
  });
  
// 로그인
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const authLst = await Auth.findAll({ 
    where: { 
      email: email
    }
  });

  const check = await bcrypt.compare(req.body.password, authLst[0].password);
  if (authLst.length===0 || !check){
    return res.json({
      error: '이메일또는 비밀번호가 일치하지않습니다.'
    });
  }

  const token = jwt.sign({
    email: email,
    password: password,
  }, process.env.JWT_SECRET, {
    expiresIn: '4m',
    issuer: 'nodebird',
  });
  return res.json({
    code: 200,
    message: '토큰이 발급되었습니다',
    token,
  });
});


module.exports = router;