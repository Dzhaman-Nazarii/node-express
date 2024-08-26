import { Router } from "express";
import { Request, Response } from "express";
import { Course } from "../models/course.js";
import { Card } from "../models/card.js";
import { ICourse } from "../models/course.interface.js";

const cardRoutes = Router();

cardRoutes.post("/add", async (req: Request, res: Response): Promise<void> => {
    try {
        const course = await Course.findById(req.body.id);

        if (course) {
            await Card.add(course as ICourse);
            res.redirect("/card");
        } else {
            res.status(404).send("Course not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
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