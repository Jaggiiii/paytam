import { SigninInput, SignupInput } from "@jagadeeshduppa/july-common";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
 

export const UserRouter = new Hono<({
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
})>();

UserRouter.post('/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())
  try{
    const body =  await c.req.json();
    const {success} = SignupInput.safeParse(body);
    if(!success) {
      c.status(412)
      console.log("hello");
      return c.json({
        message:"incorrect inputs"
      })
    }
    const user = await prisma.user.create({
      data:{
        username:body.username,
        password:body.password,
        name:body.name
      }
    })
    if(!user){
      c.status(411)
      console.log("hello world");
      return c.json({
        message:"no user"
      })
    }

    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      balance: user.balance
    };

    const token=  await sign(payload,c.env.JWT_SECRET);
    
    return c.json({
      token:token
    })
  }
  catch(e){
    console.error(e);
    console.log(e);
  }
})


UserRouter.post('/signin',async (c)=>{

  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try{
    
      const body =  await c.req.json();
      const {success}= SignupInput.safeParse(body) ;

      if(!success){
        c.status(404)
        return c.json({
          message:"incorrect inputs"
        })
      }
      const user = await prisma.user.findUnique({
        where:{
          username:body.username,
          password:body.password
        }
      })
      if(!user){
        console.log("hello");
        c.status(403)
         return c.json({
           message:"incorrect inputs"
         })
      }

    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
      balance: user.balance
    };
      const token = await sign(payload,c.env.JWT_SECRET);
      return c.json({
         token:token
      })
  }
  catch(e){
    console.error(e);
  }
})