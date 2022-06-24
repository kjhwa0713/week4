import { Router } from "express";
import { Post } from '../../models';
import { verifyToken } from './middlewares';
import { Auth } from '../../models';

const router=Router();

// 전체 글 조회
router.get('/', verifyToken,async(req, res) => {
  const postLst = await Post.findAll({});
  res.send({
    data:postLst
  });
});

// 글 개별 항목 조회
router.get('/post/:postId',verifyToken, async(req, res) => {
  const {postId}=req.params;
  const postLst = await Post.findAll({
    where: { id: postId },
  });

  if (postLst.length===0){
    return res.json({
      error: "Post not exist"
    });
  }
  res.send({
    data:postLst[0]
  });
});

// 글 생성
router.post('/',verifyToken, async(req, res) => {
  const authLst = await Auth.findAll({
    where: { 
      email: req.decoded.email
    }
  });
  const writer=authLst[0].id;

  const postLst = await Post.create({
    content: req.body.content,
    writer: writer
  });
  
  res.send({
    data:{
      post:{
        id:postLst.id
      } 
    }
  }); 
});

// 특정 글 수정
router.put('/:postId', verifyToken, async(req, res) => {
  
  const {postId}=req.params;

  const postLst = await Post.findAll({
    where: { 
      id: postId
    }
  });

  const authLst = await Auth.findAll({
    where: { 
      email: req.decoded.email
    }
  });
  const writer=String(authLst[0].id);

  if (postLst.length===0 || writer !== postLst[0].writer) {
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
router.delete('/:postId',verifyToken, async(req, res) => {
  const {postId}=req.params;
  const postLst = await Post.findAll({
    where: { 
      id: postId
    }
  });

  const authLst = await Auth.findAll({
    where: { 
      email: req.decoded.email
    }
  });

  const writer=String(authLst[0].id);
  
  if (postLst.length===0 || writer !== postLst[0].writer) {
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

module.exports = router;