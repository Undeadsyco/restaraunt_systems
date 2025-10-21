declare namespace POS {
  namespace Order {
    type ModificationItem = {
      parent: string;
      type: "modification",
      modification: "add" | "no" | "extra" | "less";
      topping: string,
      price: number
    };

    type CommentItem = {
      parent: string;
      type: "comment",
      name: string;
      message: string
    };

    type DiscountItem = {
      parent: string;
      type: "discount",
      name: string;
      amount: number
    };

    type PaymentItem = {
      type: "payment";
      source: ("Card" | "Cash");
      value: number;
    }

    type PizzaItem = {
      id: string;
      size: string;
      name: string;
      modifications: ModificationItem[]
      comments: CommentItem[];
      discount?: DiscountItem,
      price: number;
    }

    type Order = {
      selectedItem?: OrderItem | ModificationItem | CommentItem | DiscountItem | PaymentItem;
      toppingMod?: "extra" | "less";
      portion?: "halfs" | "thirds" | "forths";
      name?: string;
      items: PizzaItem[];
      itemIndex: number;
      subTotal: number;
      tax: number;
      total: number;
      payments: PaymentItem[];
      change: number;
      taxExempt: boolean;
    }
  }

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
      currentSize: string;
      currentPizza: (Omit<DataBase.Menu.IPizza, "toppings"> & { toppings: DataBase.Menu.ITopping[] }) | undefined;
      orders: Order.Order[];
      orderIndex: number;
      modal: {
        open: boolean;
        err: {
          display: boolean,
          message: string
        };
        keyboard: {
          display: boolean;
          action: string;
        };
        numberpad: {
          display: boolean;
          type: ("whole" | "partcial" | "percentage");
          action: string;
          name: string;
          amount: number;
        };
      };
    }

    type PosAction = { type: string; data?: any }
  }
}