import { model, models, Schema } from "mongoose";
import { DataNotFound } from "@/errors";
import { optionals } from "@/types";

const sectionSchema = new Schema<POS.Data.ISection>({
  name: { type: String, required: true },
  pizzas: [{ type: Schema.Types.ObjectId, ref: "pizzas" }]
});

export default class SectionController {
  static model = models.sections || model<POS.Data.ISection>("sections", sectionSchema);

  static async create(section: POS.Data.ISection): Promise<POS.Data.ISection> {
    const newSection = await this.model.create(section);
    if (!newSection) throw new Error("Section not created");
    return newSection;
  }

  static async getAll(populate = false, filters?: optionals<POS.Data.ISection>): Promise<POS.Data.ISection[]> {
    const sections = populate ? await this.model.find({ ...filters }).populate("pizzas") : await this.model.find({ ...filters });
    if (!sections) throw new DataNotFound("Sections not found");
    return sections;
  }

  static async getOne(populate = false, filters: optionals<POS.Data.ISection>): Promise<POS.Data.ISection> {
    const section = populate ? await this.model.findOne({ ...filters }).populate("pizzas") : await this.model.findOne({ ...filters });
    if (!section) throw new DataNotFound("Section not found");
    return section;
  }
}