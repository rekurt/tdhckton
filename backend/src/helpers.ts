import { Catalog, StuffFields } from "../modules/interfaces";
import { GREETING, STUFF_TITLE } from "./constants";
import { OrderStatuses } from "./shared.types";
import { CommandFields } from "../config/telegram/telegram.config";

export const formCatalogString = (
  catalogs: Catalog[],
  title: string,
): string => {
  return catalogs.reduce(
    (acc, item) => (acc += `● ${item.name} - ${item.description}\n`),
    title,
  );
};

export const parseMessage = (message: string, splitter: string): string[] => {
  return message.split(splitter);
};

export const formStuffString = (stuff: StuffFields[]): string => {
  return stuff.reduce(
    (acc, x) => (acc += `● 🆔${x.id}. 📜${x.name} for 💸${x.amount}\n`),
    STUFF_TITLE,
  );
};

export const formOrderOptions = (
  orderId: string,
  status: OrderStatuses,
): string => {
  return `Your order <b>${orderId}</b> has status ${status}`;
};

 
export const formConfirmedOrderString = (
  name: string,
  totalAmount: number,
): string => {
  return `Dear, ${name}, your order was ${OrderStatuses.CONFIRMED}. You have to pay \n💸<b>${totalAmount}</b> when you and our employee meet each other.
  Thanks for the shopping. You can try something else`;
};

export const getDeliverOrderString = (id) => {
  return `Order with ID = ${id} marked as ${OrderStatuses.DELIVERED}. THe email notification was sent to customer`;
};

export const formGreetings = (commands: CommandFields[]): string => {
  return commands.reduce(
    (acc, item, idx) =>
      (acc += `${idx + 1}. ${item.command} - ${item.description}\n`),
    'HELLO WORLD!',
  );
};
