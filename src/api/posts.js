import { Router } from "express";
import { Auth } from '../../models';
import { Post } from '../../models';

const router=Router();

// 회원가입
router.post('/auth/register', async(req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  let lst = await Auth.findAll({
    where: { email: email }
  });

  if (lst.length!==0){
    return res.json({
      error: "User already exist"
    });
  }

  let lst1 = await Auth.create({
    email: email,
    password: password
  });
  res.send({
    data:{
      user:{
        id:lst1.id
      }
    }
  })
});

// 로그인
router.post('/auth/login', async(req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  
  let lst = await Auth.findAll({
    where: { 
      email: email,
      password: password
    }
  });
  if (lst.length===0){
    return res.json({
      error: "User not exist"
    });
  }
  res.send({data:{user:{id:lst[0].id}}});
});

// 글 목록 조회
router.get('/posts', async(req, res) => {
  let lst = await Post.findAll({});
  res.send({
    data:lst
  });
});

// 글 개별 항목 조회
router.get('/post/:postId', async(req, res) => {
  const {postId}=req.params;
  let lst = await Post.findAll({
    where: { id: postId },
  });

  if (lst.length===0){
    return res.json({
      error: "Post not exist"
    });
  }
  res.send({
    data:lst[0]
  });
});

// 글 생성
router.post('/posts', async(req, res) => {
  let writer = Number(req.header("X-User-Id"));

  let lst = await Post.create({
    content: req.body.content,
    writer: writer
  });
  
  res.send({
    data:{
      post:{
        id:lst.id
      } 
    }
  }); 
});

// 특정 글 수정
router.put('/posts/:postId', async(req, res) => {
  
  const {postId}=req.params;
  let writer = req.header("X-User-Id");
  let lst = await Post.findAll({
    where: { 
      id: postId
    }
  })

  if (lst.length===0 || writer !== lst[0].writer) {
    return res.json({
      error: "Cannot modify post"
    });
  }
  Post.update({
    content: req.body.content, 
  }, 
  {
    where: {id: postId},
  });
  
  res.send({
    data:{
      id:postId
    }
  });
});

// 특정 글 삭제
router.delete('/posts/:postId', async(req, res) => {
  const {postId}=req.params;
  let writer = req.header("X-User-Id");
  let lst = await Post.findAll({
    where: { 
      id: postId
    }
  })

  if (lst.length===0 || writer !== lst[0].writer) {
    return res.json({
      error: "Cannot delete post"
    });
  }

  Post.destroy({
    where: { id: postId},
  });
  
  res.json({
    "data": "Successfully deleted"
  });
});


export default router;