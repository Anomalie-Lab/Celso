"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Account } from "@/api/account.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LucidePlus, LucideEdit, Loader2 } from "lucide-react";
import { FormDataAddress, SchemaAddress } from "@/entities/schemas";
import { InputDefault } from "../ui/inputs/input.default";
import { formatCep, unformatCep } from "@/lib/utils";

interface AddressFormProps {
  mode: "create" | "edit";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address?: any;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

interface ViaCepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}


const AddressForm = ({ mode, address, children, onSuccess }: AddressFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: yupResolver(SchemaAddress),
    defaultValues: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip_code: "",
      primary: false,
    },
  });

  const searchCep = useCallback(
    async (cep: string) => {
      const cleanCep = unformatCep(cep);

      if (cleanCep.length !== 8) return;

      try {
        setIsLoadingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data: ViaCepResponse = await response.json();

        if (!data.erro) {
          setValue("street", data.logradouro || "");
          setValue("neighborhood", data.bairro || "");
          setValue("city", data.localidade || "");
          setValue("state", data.uf || "");

          toast.success("Endereço encontrado!", {
            description: "Os campos foram preenchidos automaticamente.",
          });
        } else {
          toast.error("CEP não encontrado", {
            description: "Verifique se o CEP está correto.",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar CEP", {
          description: "Tente novamente em alguns instantes.",
        });
      } finally {
        setIsLoadingCep(false);
      }
    },
    [setValue]
  );

  const debouncedSearchCep = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (cep: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => searchCep(cep), 500);
      };
    })(),
    [searchCep]
  );

  useEffect(() => {
    if (address && mode === "edit") {
      reset({
        street: address.street || "",
        number: address.number || "",
        complement: address.complement || "",
        neighborhood: address.neighborhood || "",
        city: address.city || "",
        state: address.state || "",
        zip_code: address.zip_code || "",
        primary: Boolean(address.primary),
      });
    } else {
      reset({
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
        primary: false,
      });
    }
  }, [address, mode, reset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      if (mode === "create") {
        await Account.createAddress(data);
        toast.success("Endereço criado com sucesso!", {
          description: "Seu endereço foi adicionado.",
        });
      } else {
        if (!address?.id) {
          throw new Error("ID do endereço não encontrado");
        }
        await Account.updateAddress(address.id, data);
        toast.success("Endereço atualizado com sucesso!", {
          description: "Seu endereço foi atualizado.",
        });
      }

      reset();
      setIsOpen(false);
      onSuccess?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : `Erro ao ${mode === "create" ? "criar" : "atualizar"} endereço.`;
      toast.error(`Erro ao ${mode === "create" ? "criar" : "atualizar"} endereço`, {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) reset();
  };

  const renderDefaultButton = () => {
    if (children) return children;

    if (mode === "create") {
      return (
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <LucidePlus className="w-4 h-4" />
          Adicionar Endereço
        </Button>
      );
    }

    return (
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <LucideEdit className="w-4 h-4" />
        Editar
      </Button>
    );
  };

  const renderCepField = () => (
    <div className="relative">
      <InputDefault
        label="CEP"
        required
        value={watch("zip_code")}
        {...register("zip_code")}
        error={errors.zip_code?.message as string}
        onChange={(e) => {
          const formatted = formatCep(e.target.value);
          setValue("zip_code", formatted);
          debouncedSearchCep(formatted);
        }}
        placeholder="12345-678"
      />
      {isLoadingCep && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </div>
      )}
    </div>
  );

  const renderFormFields = () => (
    <div className="space-y-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderCepField()}
        <InputDefault label="Estado" required value={watch("state")} {...register("state")} error={errors.state?.message as string} maxLength={2} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputDefault label="Cidade" required value={watch("city")} {...register("city")} error={errors.city?.message as string} />
        <InputDefault label="Bairro" required value={watch("neighborhood")} {...register("neighborhood")} error={errors.neighborhood?.message as string} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <InputDefault label="Rua" required value={watch("street")} {...register("street")} error={errors.street?.message as string} className="md:col-span-2" />
        <InputDefault label="Número" required value={watch("number")} {...register("number")} error={errors.number?.message as string} />
      </div>

      <InputDefault label="Complemento" value={watch("complement") || ""} {...register("complement")} error={errors.complement?.message as string} />

      <div className="flex items-center space-x-2 mt-8">
        <input type="checkbox" id="primary" {...register("primary")} className="rounded border-gray-300 text-primary focus:ring-primary" />
        <label htmlFor="primary" className="text-sm text-gray-700">
          Definir como endereço padrão
        </label>
      </div>
    </div>
  );

  const renderFormButtons = () => (
    <div className="flex justify-end gap-3 pt-4">
      <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (mode === "create" ? "Criando..." : "Atualizando...") : mode === "create" ? "Criar Endereço" : "Atualizar Endereço"}
      </Button>
    </div>
  );

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {renderDefaultButton()}
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{mode === "create" ? "Adicionar Endereço" : "Editar Endereço"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderFormFields()}
            {renderFormButtons()}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressForm;
