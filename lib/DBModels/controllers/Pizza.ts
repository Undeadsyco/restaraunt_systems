import { models, model, Schema, Query, HydratedDocument, RootFilterQuery } from "mongoose";
import { DataNotFound } from "@/errors";
import ToppingController from "./Topping";
import DoughController from "./Dough";
import dbConnect from "@/lib/DBConnections/DBConnect";

type PizzaFilters = RootFilterQuery<DataBase.Menu.IPizza>;
type PizzaDocument = HydratedDocument<DataBase.Menu.IPizza>;
type PopulateOptions = {
  toppings?: boolean;
  section?: boolean;
}

const portionItem = new Schema<DataBase.Menu.IPortion>({
  sizes: [{ type: Schema.Types.ObjectId, ref: "doughs" }],
  portion: { type: Number, required: true }
}, { _id: false, versionKey: false })

const toppingItem = new Schema<DataBase.Menu.IToppingItem>({
  item: { type: Schema.Types.ObjectId, ref: "toppings" },
  portions: { type: [portionItem], required: true }
}, { _id: false, versionKey: false })

const priceItem = new Schema<DataBase.Menu.IPrice>({
  size: { type: Schema.Types.ObjectId, ref: "doughs", required: true },
  cost: { type: Number, required: true },
}, { _id: false, versionKey: false })

const pizzaSchema = new Schema<DataBase.Menu.IPizza>({
  name: { type: String, required: true },
  section: {
    type: Schema.Types.ObjectId,
    ref: "sections",
    required: true,
    validate: {
      validator: (value: string) => value !== "",
      message: "Path `section` is required"
    }
  },
  toppings: {
    type: [toppingItem],
    required: true,
    validate: [
      {
        validator: (values: DataBase.Menu.IToppingItem[]) => {
          for (const topping of values) {
            const numOfInstance = values.filter(t => t.item.toString() === topping.item.toString()).length;
            if (numOfInstance > 1) {
              return false;
            }
          }
          return true;
        },
        message: "Toppings cannot be duplicated"
      },
      {
        validator: async (toppings: DataBase.Menu.IToppingItem[]) => {
          let sauceCount = 0;
          for (const topping of toppings) {
            if ((await ToppingController.getOne({ _id: topping.item }))?.type === "sauce") {
              if (sauceCount >= 1) return false;
              sauceCount += 1;
            }
          }
          return true;
        },
        message: "Pizza can only have one sauce type"
      },
      {
        validator: (value: DataBase.Menu.IToppingItem[]) => value.length > 0,
        message: "Path `Topping` is required and cannot be empty"
      }
    ]
  },
  prices: {
    type: [priceItem],
    required: true,
    validate: [
      {
        validator: (values: DataBase.Menu.IPrice[]) => {
          for (const price of values) {
            if (values.filter(p => p.size.toString() === price.size.toString()).length > 1) {
              return false;
            }
          }
          return true;
        },
        message: "Conflicting prices, found multiple instances of the same size"
      },
      {
        validator: (values:DataBase.Menu.IPrice[]) => values.length > 0,
        message: "Path `prices` is required and cannot be empty"
      }
    ]
  },
}, { versionKey: false });

pizzaSchema.pre("validate", { document: true }, async function (next) {
  await dbConnect();
  for (const price of this.prices) {
    const size = await DoughController.getOne({ _id: price.size });
    for (const item of this.toppings) {
      const topping = await ToppingController.getOne({ _id: item.item });
      let found = false;
      item.portions.forEach(p => {
        if (p.sizes.includes(price.size)) found = true;
      });
      if (!found) this.invalidate("toppings", `could not find ${topping?.name} portions for size ${size?.name}`)
    }
  }
  next();
})

export default class PizzaController {
  private static model = models.pizzas || model<DataBase.Menu.IPizza>("pizzas", pizzaSchema);

  private static async populateDocument(document: PizzaDocument, options: PopulateOptions) {
    if (options.section) await document.populate("section");
    if (options.toppings) await document.populate("toppings");
    return document
  }

  public static async create(pizza: DataBase.Menu.IPizza): Promise<any> {
    const newPizza: PizzaDocument = await this.model.create(pizza);
    if (!newPizza) throw new DataNotFound("Pizza not created");
    return newPizza;
  }

  public static async getAll(filters?: PizzaFilters, options?: PopulateOptions): Promise<PizzaDocument[]> {
    const pizzas = await this.model.find({ ...filters });
    if (options) {
      for (let i = 0; i < pizzas.length; i += 1) {
        pizzas[i] = await this.populateDocument(pizzas[i], options);
      }
    };
    return pizzas;
  }

  public static async getOne(filters: PizzaFilters, options?: PopulateOptions): Promise<PizzaDocument | null> {
    let pizza = await this.model.findOne({ ...filters });
    if (options) pizza = await this.populateDocument(pizza, options);
    return pizza;
  }

  public static async update(pizza: DataBase.Menu.IPizza) {
    return await this.model.findByIdAndUpdate(pizza._id, pizza, { new: true });
  }

  public static async deleteOne(id: string): Promise<PizzaDocument | null> {
    return await this.model.findByIdAndDelete(id);
  }
}