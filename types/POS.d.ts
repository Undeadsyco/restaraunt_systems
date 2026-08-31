declare namespace POS {
  namespace Reducer {
    type Employee = Omit<DataBase.People.IEmployee, (
      "age" |
      "number" |
      "birthdate" |
      "address" |
      "ssn" |
      "emergency_contacts" |
      "pos_info" |
      "office_info"
    )>

    type PosState = {
      user: Employee | undefined;
      sections: DataBase.Menu.ISection[];
      dough: DataBase.Menu.IDough[];
      pizzas: DataBase.Menu.IPizza[];
      toppings: DataBase.Menu.ITopping[];
      section: string;
      pizza: string;
      toppingType: Types.toppingTypes;
      orders: import("../app/pos/classes").Order[];
      index: number;
      modal: {
        display: boolean;
        child?: import("react").ReactNode
      };
    }

    type PosAction = { type: string; data?: any }
  }

  namespace Types {
    type toppingTypes = ("Sauce" | "Cheese" | "Meat" | "Produce" | "Seasoning");

    type modificationType = ("Add" | "Remove" | "Extra" | "Less");

    type portionType = Exclude<modificationType, ("Add" | "Remove")>;

    type discountCategory = ("whole" | "partcial" | "percentage");

    type orderType = ("walk in" | "call in" | "online");

    type orderStatus = ("open" | "closed");

    type pizza = import("../app/pos/classes").Pizza;

    type orderItem = (pizza)
  }
}