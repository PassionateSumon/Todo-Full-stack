const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, todoModel } = require("./db");
require("dotenv").config();
const mongoose = require("mongoose");
const { z } = require("zod");
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Include custom 'token' header
    credentials: true, // Enable cookies or other credentials
  })
);
app.options("*", cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected with DB"))
  .catch((e) => console.error("Database error: ", e));

function auth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const validUser = jwt.verify(token, JWT_SECRET);

    if (validUser) {
      req.userId = validUser.id;
      next();
    } else {
      res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    // console.error("Authentication error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.post("/api/signup", async function (req, res) {
  const requiredBody = z.object({
    username: z.string().min(5).max(35).includes("@"),
    password: z
      .string()
      .min(5)
      .max(35)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      ),
  });

  const parsedBody = requiredBody.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      error: parsedBody.error.issues,
      message: "Incorrect format!!",
    });
  }

  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username: username,
      password: hashedPassword,
    });

    res.json({
      message: "You're signed up..",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Duplicare username error!!!",
    });
  }
});

app.post("/api/signin", async function (req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const matchedUserPassword = await bcrypt.compare(password, user.password);
    if (!matchedUserPassword) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/addtodo", auth, async function (req, res) {
  const todoRequired = z.object({
    todoHeading: z.string().min(1, "Heading is required"),
    todoBody: z.string().min(1, "Body is required"),
  });

  const parsedBody = todoRequired.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      error: parsedBody.error.issues,
      message: "Invalid format",
    });
  }

  const userId = req.userId;
  const { todoHeading, todoBody } = req.body;

  try {
    await todoModel.create({
      title: todoHeading,
      body: todoBody,
      userId: userId,
    });

    res.json({
      userId: userId,
      message: "add todo",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/gettodo", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await todoModel.find({
    userId: userId,
  });
  res.json({
    todos: todos,
  });
});

app.get("/api/me", auth, async function (req, res) {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!!",
    });
  }
});

app.put("/api/edittodo/:id", auth, async function (req, res) {
  const todoId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({
      message: "Invalid Todo ID..",
    });
  }

  const todoRequired = z.object({
    todoHeading: z.string().min(1, "Heading is required"),
    todoBody: z.string().min(1, "Body is required"),
  });

  const parsedBody = todoRequired.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      error: parsedBody.error.issues,
      message: "Invalid format",
    });
  }

  const { todoHeading, todoBody } = req.body;

  try {
    const todo = await todoModel.findOne({ _id: todoId, userId: req.userId });
    if (!todo) {
      return res.status(404).json({
        message: "No todo found..",
      });
    }
    if (todoHeading) {
      todo.title = todoHeading;
    }
    if (todoBody) {
      todo.body = todoBody;
    }

    await todo.save();
    res.json({
      message: "Todo updated..",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error..",
    });
  }
});

app.delete("/api/deletetodo/:id", auth, async function (req, res) {
  const todoId = req.params.id;
  try {
    const newTodo = await todoModel.findOneAndDelete({
      _id: todoId,
      userId: req.userId,
    });

    if (!newTodo) {
      return res.status(404).json({
        message:
          "Not found for deleteing or don't have the permission to delete..",
      });
    }

    res.json({
      message: "Successfully delete..",
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid..",
    });
  }
});

app.listen(3000);
