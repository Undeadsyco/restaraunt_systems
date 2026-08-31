declare namespace DataBase {
  namespace Labor {
    interface ITimePunch {
      _id?: Types.IDType;
      employee: Types.IDType;
      type: Types.PunchTypes;
      time: Date;
    }
  }

  namespace Menu {
    interface IDough {
      _id: string;
      name: string;
      weight: number;
      measurement: string;
      abbreviation: string;
    };

    interface ISection {
      _id: string;
      name: string;
      pizzas: string[];
    };

    interface IPrice<Size = Types.IDType> {
      size: Size;
      cost: number;
    };

    interface IPortion<Sizes = Types.IDType> {
      sizes: Sizes[];
      portion: number;
    };

    interface IToppingItem<Item = Types.IDType, Portions = IPortion> {
      item: Item;
      portions: Portions[];
    }

    interface IPizza<Section = Types.IDType, Toppings = IToppingItem, Prices = IPrice> {
      _id: string;
      name: string;
      section: Section;
      toppings: Toppings[];
      prices: Prices[];
    };

    interface ITopping {
      _id: string;
      name: string;
      type: string;
      measurement: string;
      price: number;
    };
  }

  namespace Order {
    interface Discount {
      name: string;
      amount: number;
    }
    interface Modification {
      topping: Types.IDType;
      type: POS.Types.modificationType;
    }
    interface Comment {
      name: string;
      message: string;
    }
    interface OrderedItem {
      item: Types.IDType;
      type: String;
      modifications: Modification[];
      comments: Comment[];
      discount: Discount;
    }

    interface Payment {
      source: "Cash" | "Card";
      amount: number;
    }

    interface Order {
      _id: string;
      orderNumber: string;
      name?: string;
      type: POS.Types.orderType;
      status: POS.Types.orderStatus;
      items: OrderedItem[];
      payments: Payment[]
      date: Date;
    }
  }

  namespace People {
    namespace Info {
      interface IContactDetails {
        name: string;
        number: string;
        relation?: string;
      }

      interface IAddress {
        street: string;
        city: string;
        state: string;
        zip: string;
      }

      interface IPosInfo {
        access: number;
        reset_date?: Date;
        password?: string;
      }

      interface IOfficeInfo {
        access: boolean;
        username: string;
        reset_date?: Date;
        password?: string;
      }

      interface IEmployment {
        id: string;
        store: Types.IDType;
        manager: Types.IDType;
        employeed: boolean;
        clocked_in: boolean;
        on_break: boolean;
        pay_rate: number;
        position: Types.EmploymentPositions;
        start_date: Date;
        years_worked: number;
        end_date?: Date;
      }
    }

    interface IPerson {
      _id?: Types.IDType;
      name: string;
      age: number;
      number: string;
      address: Info.IAddress;
      birthdate: Date;
    }

    interface IUser extends IPerson {
      email: string;
      password: string;
    }

    interface IEmployee extends IPerson {
      ssn: string;
      emergency_contacts: Info.IContactDetails[];
      employment: Info.IEmployment;
      pos_info: Info.IPosInfo;
      office_info?: Info.IOfficeInfo;
    }
  }

  namespace Types {
    type IDType = (import("mongoose").Schema.Types.ObjectId | string);

    type PunchTypes = ("clock_in" | "clock_out" | "break_in" | "break_out");

    type EmploymentPositions = ("Crew Member" | "Shift Leader" | "Assistant Manager" | "Store Manager" | "General Manager");
  }
}