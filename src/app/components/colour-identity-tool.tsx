"use client";

import { useCallback, useState } from "react";
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
