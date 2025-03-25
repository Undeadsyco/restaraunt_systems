declare namespace POS {

  namespace Data {
    interface IAddress {
      street: string;
      city: string;
      state: string;
      zip: string;
    }

    interface IUser {
      _id?: IDType;
      name: string;
      email: string;
      number: string | null;
      password: string;
      address: IAddress[] | null;
      birthdate: Date | null;
    }

    interface IEmployee extends IUser {
      emp_id: string;
      start_date: Date;
      end_date: Date | null;
      hourly_rate: number;
      position: "Crew" | "Shift" | "Asst" | "Mana";
      employeed: boolean;
      clocked_in: boolean;
      on_break: boolean;
    }

    interface IDough {
      _id?: IDType;
      name: string;
      weight: number;
      measurement: string;
    };

    interface ISection {
      _id?: IDType;
      name: string;
      pizzas: (IDType)[];
    };

    interface IPrice {
      dough: IDType;
      price: number;
    };

    interface IPizza {
      _id?: IDType;
      name: string;
      section: IDType;
      toppings: (IDType)[];
      prices: IPrice[];
    };

    interface IPortion {
      size: IDType;
      amount: number;
    };

    interface ITopping {
      _id?: IDType;
      name: string;
      type: string;
      measurement: string;
      price: number;
      amount_per_size: IPortion[]
    };
  }

  namespace Props {
    type PosComponent = {
      state: POS.Reducer.PosState;
      dispatch: Dispatch<POS.Reducer.PosAction>;
    }
  }

  namespace Reducer {
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

    type Portions = ("whole" | "halfs" | "thirds" | "forths");

    type WholeList = [Types.IDType];
    type HalfsList = [Types.IDType, Types.IDType];
    type ThirdsList = [Types.IDType, Types.IDType, Types.IDType];
    type ForthsList = [Types.IDType, Types.IDType, Types.IDType, Types.IDType];

    type PizzaItem<P extends Portions> = {
      type: "pizza"
      size: Types.IDType;
      portion: P;
      pizzas: P extends "whole" ? WholeList : P extends "halfs" ? HalfsList : P extends "thirds" ? ThirdsList : ForthsList;
      modifications: Modification[]
    }

    type defaultOrderItem = {
      id: string;
      // type: T extends "pizza" ? "pizza" : T extends "side" ? "side" : T extends "salad" ? "salad" : "toppings";
      // item: Types.IDType;
      // size: T extends "pizza" ? POS.Types.IDType : undefined;
      // modifications: T extends "pizza" ? ModificationItem[] : undefined;
      comments: CommentItem[];
      discount?: DiscountItem,
      price: number;
    }

    type OrderItem<T extends ("pizza" | "side" | "salad" | "toppings") = "pizza"> = defaultOrderItem & (T extends "pizza"
      ? PizzaItem<Portions>
      : null)

    type order = {
      selectedItem?: OrderItem<("pizza" | "side" | "salad" | "toppings")> | ModificationItem | CommentItem | DiscountItem;
      toppingMod?: "extra" | "less";
      portion?: "halfs" | "thirds" | "forths";
      name?: string;
      items: OrderItem[];
      itemIndex: number
      price: number;
    }

    type PosState = {
      dough: Data.IDough[];
      sections: Data.ISection[];
      pizzas: Data.IPizza[];
      toppings: Data.ITopping[];
      currentSize: string;
      currentPizza: string;
      toppingPreview: Types.IDType[];
      orders: order[];
      orderIndex: number;
      views: {
        main: "Menu" | "Comments" | "Discounts";
        menu: "Traditional" | "Toppings" | "Specials" | "Stuffed" | "AOS";
      },
      modal: {
        open: boolean;
        err: { display: boolean, message: string };
        keyboard: { display: boolean; action: string;  };
        numberpad: { display: boolean; type: ("whole" | "fractional"); action: string; data: Object<any> };
      };
    }

    type PosAction = { type: string; data?: any }
  }

  namespace Types {
    type IDType = (import("mongoose").Types.ObjectId | string);
  }
}