import { models, model, Schema, Query } from "mongoose";
import { DataNotFound } from "@/errors";
import { optionals } from "@/types";

type pizzaPopulateOptions = ("All" | "Section" | "Topping" | "Dough")

const pizzaSchema = new Schema<POS.Data.IPizza>({
  name: { type: String, required: true },
  section: { type: Schema.Types.ObjectId, ref: "sections", required: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: "toppings" }],
  prices: {
    type: [
      new Schema<POS.Data.IPrice>({
        dough: { type: Schema.Types.ObjectId, ref: "doughs" },
        price: { type: Number, required: true },
      }, { _id: false })
    ], required: true
  },
});

export default class PizzaController {
  static model = models.pizzas || model<POS.Data.IPizza>("pizzas", pizzaSchema);

  static populate(data: Query<any[], any, {}, any, "find">, options: pizzaPopulateOptions[]) {
    if (options.includes("All")) {
      data.populate("section").populate("toppings").populate("sizes.dough");
    } else {
      if (options.includes("Section")) data.populate("section");
      if (options.includes("Topping")) data.populate("toppings");
      if (options.includes("Dough")) data.populate("sizes.dough");
    }
  }

  static async getAll(filters?: optionals<POS.Data.IPizza>, options?: { populate: pizzaPopulateOptions[] }): Promise<POS.Data.IPizza[]> {
    const data = this.model.find({ ...filters });

    if (options?.populate) this.populate(data, options.populate);

    const pizzas = await data;
    if (!pizzas) throw new DataNotFound("Pizzas not found");

    return pizzas;
  }

  static async getMany(filters: optionals<POS.Data.IPizza>[], options?: { populate?: pizzaPopulateOptions[] }): Promise<POS.Data.IPizza[]> {
    const pizzas = [];
    for (const pizzaFilters of filters) {
      const data = this.model.findOne(pizzaFilters);
      if (options?.populate) this.populate(data, options.populate);

      const pizza = await data;
      if (!pizza) {}

      pizzas.push(pizza);
    }

    return pizzas;
  }

  static async getOne(filters: optionals<POS.Data.IPizza>, options?: { populate?: pizzaPopulateOptions[] }): Promise<POS.Data.IPizza> {
    const data = this.model.findOne({ ...filters });

    if (options?.populate) this.populate(data, options.populate);

    const pizzas = await data;

    if (!pizzas) throw new DataNotFound("Pizza not found");
    return pizzas;
  }

  static async getOneByNameFiltered({ name, size }: { name: string, size: string }): Promise<POS.Data.IPizza> {
    const pizza = (await this.model.aggregate([
      { $match: { name } },
      {
        $lookup: {
          from: "toppings",
          localField: "toppings",
          foreignField: "_id",
          as: "toppings"
        }
      },
      {
        $unwind: "$sizes"
      },
      {
        $match: { "sizes.size": size }
      },
      {
        $lookup: {
          from: "doughs",
          localField: "sizes.dough",
          foreignField: "_id",
          as: "sizes.dough"
        }
      },
      {
        $unwind: "$sizes.dough"
      },
      {
        $project: {
          name: 1,
          sizes: 1,
          toppings: 1
        }
      }
    ]))[0];
    if (!pizza) throw new DataNotFound("Pizza not found");
    return pizza;
  }

  static async create(pizza: POS.Data.IPizza): Promise<POS.Data.IPizza> {
    const newPizza = await this.model.create(pizza);
    if (!newPizza) throw new DataNotFound("Pizza not created");
    return newPizza;
  }
}