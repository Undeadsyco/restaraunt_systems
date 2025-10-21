export const formatDate = (date: Date | string) => new Date(date).toISOString().slice(0, 10);

export const formatPhoneNumber = (number: string): string => {
    const matches = number.replace(/\D/g, "").split(/^(\d{3})(\d{3})(\d{4})$/);
    return `(${matches[1]}) ${matches[2]}-${matches[3]}`;
}

export const sortByNameAsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => a.name.localeCompare(b.name))])

export const sortByNameDsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => b.name.localeCompare(a.name))]) 

const toppingTypeEnum = {
    "sauce": 0,
    "cheese": 1,
    "meat": 2,
    "produce": 3,
    "seasoning": 4,
    "dessert": 5
}
type toppingTypeKeys = keyof typeof toppingTypeEnum;
export const sortByTypeAsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (
    toppingTypeEnum[a.type as toppingTypeKeys] - toppingTypeEnum[b.type as toppingTypeKeys])
)]);
export const sortByTypeDsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (
    toppingTypeEnum[b.type as toppingTypeKeys] - toppingTypeEnum[a.type as toppingTypeKeys])
)]);

const toppingMeasurementsEnum = {
    "OZ": 0,
    "CUPS": 1,
    "SLICES": 2,
    "TBS": 3,
}
type toppingMeasurementKeys = keyof typeof toppingMeasurementsEnum;
export const sortByMeasurementAsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (
    toppingMeasurementsEnum[a.measurement as toppingMeasurementKeys] - toppingMeasurementsEnum[b.measurement as toppingMeasurementKeys]
))]);
export const sortByMeasurementDsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (
    toppingMeasurementsEnum[b.measurement as toppingMeasurementKeys] - toppingMeasurementsEnum[a.measurement as toppingMeasurementKeys]
))]);

export const sortByPriceAsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (a.price - b.price))])

export const sortByPriceDsc = (list: DataBase.Menu.ITopping[]) => ([...list.sort((a, b) => (b.price - a.price))])