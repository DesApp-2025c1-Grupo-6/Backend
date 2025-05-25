import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errores = error.details.map((err) => err.message);
      res.status(400).json({ errores });
      return;
    }

    next();
  };
};

export const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const errores = error.details.map((err) => err.message);
      res.status(400).json({ errores });
      return;
    }

    next();
  };
};
