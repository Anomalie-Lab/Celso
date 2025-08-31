"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useUser } from "@/hooks/user.hook";
import { Account } from "@/api/account.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LucideEdit } from "lucide-react";
import { FormDataEditAccount, SchemaEditAccount } from "@/entities/schemas";
import { InputDefault } from "../ui/inputs/input.default";
import { formatPhone } from "@/lib/utils";

const EditAccount = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormDataEditAccount>({ resolver: yupResolver(SchemaEditAccount) });

  useEffect(() => {
    reset({
      fullname: user?.fullname || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birthdate: user?.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : "",
    });
  }, [user]);

  const onSubmit = async (data: FormDataEditAccount) => {
    try {
      setIsLoading(true);
      const response = await Account.updateUser(data);

      if (response) {
        setUser(response);
        toast.success("Perfil atualizado com sucesso!", {
          description: "Suas informações foram salvas.",
        });
        reset();
        setIsOpen(false);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar perfil.";
      toast.error("Erro ao atualizar perfil", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      reset({
        fullname: user?.fullname || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        birthdate: user?.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : "",
      });
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(true)}>
        <LucideEdit className="w-4 h-4" />
        Editar Perfil
      </Button>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-12">
              <InputDefault label="Nome Completo" required value={watch("fullname")} {...register("fullname")} error={errors.fullname?.message as string} />
              <InputDefault label="Username" required value={watch("username")} {...register("username")} error={errors.username?.message as string} />
              <InputDefault label="Email" type="email" required value={watch("email")} {...register("email")} error={errors.email?.message as string} />
              <InputDefault
                label="Telefone"
                required
                value={watch("phone")}
                {...register("phone")}
                error={errors.phone?.message as string}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setValue("phone", formatted);
                }}
                placeholder="11 99999-9999"
              />
              <InputDefault label="Data de Nascimento" type="date" required value={user?.birthdate || ""} {...register("birthdate")} error={errors.birthdate?.message as string} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAccount;
