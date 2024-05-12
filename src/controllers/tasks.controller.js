import { pool } from "../db.js";

export const getAllTasks = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM task WHERE user_id = $1", [
    req.userId,
  ]);
  return res.json(result.rows);
};

export const getTask = async (req, res) => {
  const result = await pool.query("SELECT * FROM task WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, due_date, req.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe una tarea con ese titulo",
      });
    }
    next(error);
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description, due_date} = req.body;

  const result = await pool.query(
    "UPDATE task SET title = $1, description = $2, due_date = $3 WHERE id = $4 RETURNING *",
    [title, description, due_date, id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  return res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const result = await pool.query("DELETE FROM task WHERE id = $1", [
    req.params.id,
  ]);

  if (result.rowCount === 0) {
    return res.status(404).json({
      message: "No existe una tarea con ese id",
    });
  }

  return res.sendStatus(204);
};
