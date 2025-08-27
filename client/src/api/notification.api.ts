import { api } from "@/lib/axios.lib";
import handleUnknownError from "@/utils/handle-unknown-error.util";

const Get = async () => {
  try {
    return await api.get<Account.NotificationI[] | []>("notification");
  } catch (error) {
    throw new Error(handleUnknownError(error, "Erro buscar notificações"));
  }
};

const Read = async (id: number) => {
  try {
    return await api.patch(`notification/read/${id}`);
  } catch (error) {
    throw new Error(handleUnknownError(error, "Erro buscar notificações"));
  }
};

const Delete = async (id: number) => {
  try {
    return await api.patch(`notification/delete/${id}`);
  } catch (error) {
    throw new Error(handleUnknownError(error, "Erro buscar notificações"));
  }
};

export const Notification = { Get, Read, Delete };
