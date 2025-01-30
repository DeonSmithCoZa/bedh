"use client";

import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ColourIdentityToolStateDefault from "./colour-identity-tool-state-default";
import ColourIdentityToolStateRolled from "./colour-identity-tool-state-rolled";

const ColourIdentityTool: React.FC = () => {
  const [rolled, setRolled] = useState<boolean>(false);
  const form = useForm();

  const onSubmit = form.handleSubmit(() => {
    setRolled(true);
  });

  const handleReset = useCallback(() => {
    setRolled(false);
    form.reset();
  }, [form]);

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams();
  const seed = searchParams.get("SEED");

  useEffect(() => {
    if (seed) {
      const decodedSeed = atob(seed);
      const seedObject = JSON.parse(decodedSeed);
      form.setValue("names", seedObject.names);
      form.setValue("allowDuplicates", seedObject.allowDuplicates);
      form.setValue("values", seedObject.values);
      form.setValue("rerolls", seedObject.rerolls);
      setRolled(true);
    }
  }, [seed, form]);

  return (
    <FormProvider {...form}>
      <form className="min-h-[280px]" onSubmit={onSubmit}>
        {!rolled && <ColourIdentityToolStateDefault />}
        {rolled && <ColourIdentityToolStateRolled handleReset={handleReset} />}
      </form>
    </FormProvider>
  );
};

export default ColourIdentityTool;
