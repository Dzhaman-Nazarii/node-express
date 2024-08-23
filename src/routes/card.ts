import { Router } from "express";
import { Request, Response } from "express";
import { Course } from "../models/course.js";
import { Card } from "../models/card.js";

const cardRoutes = Router();

cardRoutes.post("/add", async (req: Request, res: Response): Promise<void> => {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    res.redirect("/card");
});

cardRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
    const card = await Card.fetch();
    res.render("card", {
        title: "Card",
        isCard: true,
        courses: card.courses,
        price: card.price,
    });
});

cardRoutes.delete("/remove/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const card = await Card.remove(req.params.id);
        res.json(card);
    } catch (error) {
        console.error("Error in delete route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { cardRoutes };