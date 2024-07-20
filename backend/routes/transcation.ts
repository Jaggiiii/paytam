import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { number, z } from "zod";
import { Sending, SignupInput } from "@jagadeeshduppa/july-common";


export const TransactionUser = new Hono<({
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables: {
    userId: string,
    name: string
  }
})>();


TransactionUser.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        password: true,
        id: true,
        balance: true
      }
    });
    return c.json({
      users
    });
  } catch (e) {
    console.error(e);
    c.status(500)
    return c.json({
      message: "Internal server error"
    });
  }
});


TransactionUser.use('/*', async (c, next) => {
  const authheader = c.req.header("authorization") || "";
  if (!authheader) {
    c.status(403)
    return c.json({
      message: "No auth header provided"
    });
  }

  try {

    const user = await verify(authheader, c.env.JWT_SECRET) as { id: string } | null;
    if (!user) {
      c.status(410)
      return c.json({
        message: "Invalid token"
      });
    }
    c.set("userId", user.id);
    await next();
  } catch (e) {
    console.error(e);
    c.status(403)
    return c.json({
      message: "Invalid token"
    });
  }
});



TransactionUser.post('/send', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const schema = z.object({
      sendername: z.string().email(),
      receivername: z.string().email(),
      amount: z.number().positive()
    });
    const body = await c.req.json();
    const success = Sending.safeParse(body);
    if (!success) {
      c.status(400)
      return c.json({
        message: "incorrect inputs"
      })
    }
    const { sendername, receivername, amount } = schema.parse(body);
    const sender = await prisma.user.findUnique({
      where: {
        username: sendername
      }
    })
    const receiver = await prisma.user.findUnique({
      where: {
        username: receivername
      },
    });

    if (!sender || !receiver) {
      c.status(400)
      return c.json({
        message: "either reciver or sender not found"
      })
    }

    if (sender.balance < amount) {
      return c.json({
        message: "balance insuffient "
      })
    }

    await prisma.$transaction([
      prisma.user.update({
        where: {
          username: sendername
        },
        data: {
          balance: { decrement: amount }
        }
      }),

      prisma.user.update({
        where: {
          username: receivername
        }, data: {
          balance: {
            increment: amount
          }
        }
      }),

      prisma.transaction.create({
        data: {
          senderid: sender.id,
          receiverid: receiver.id,
          Amount: amount
        }
      })
    ]);

    return c.json({
      message: " transaction successful"
    })

  } catch (e) {
    console.error(e);
  }
})

TransactionUser.get('/history/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const userId = c.req.param('id');
    if (!userId) {
      c.status(403)
      return c.json({
        message: "user not found"
      })
    }
    const senders = await prisma.transaction.findMany({
      where: {
        senderid: parseInt(userId)
      },
      include: {
        receiver: true
      }
    })
    const receivers = await prisma.transaction.findMany({
      where: {
        receiverid: parseInt(userId)
      },
      include: {
        sender: true
      }
    })
    return c.json({
      sended: senders,
      received: receivers
    })
  }
  catch (e) {
    console.error(e);
  }
})


TransactionUser.get('/balance/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const userId = parseInt(c.req.param('id'))
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        balance: true
      }
    })
    if (!user) {
      c.status(403)
      return c.json({
        message: "user not found"
      })
    }
    return c.json({
      balance: user.balance
    })

  }
  catch (e) {
    console.error(e);
  }
});


TransactionUser.delete('delete',async(c)=>{
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());

  if(!userId){
    c.status(411)
    return c.json({
      message:"user not found"
    })
  }
  try{
    const k = parseInt(userId);
 const response  =  await prisma.user.delete({
      where:{
        id:k
      },
      select:{
        id:true
      }
    });
    return c.json({
      message:"user deleted successfully"
    })
  }
  catch(e){
    console.error(e);
  }
})

TransactionUser.put('/update',async(c)=>{
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try{
    if(!userId){
      throw new Error("user does not exists");
    }
  const k = parseInt(userId);
  const body = await c.req.json();
  const {success} = SignupInput.safeParse(body);
  if(!success){
    return c.json({
      message:"incorrect inputs"
    })
  }
    const response = await prisma.user.update({
      where:{
        id:k
      },
    data:{
      name:body.name,
      username:body.username,
      password:body.password
    }
    })

   return c.json({
     message: "User updated successfully", user: response });
  }
  catch(e){
    console.error(e);
  }
})
