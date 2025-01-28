import { ReactNode } from "react";

const SectionBody: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => (
  <section
    className={`font-geist flex flex-col justify-center justify-items-center items-center p-4 pb-0 text-md`}
  >
    <h2 className="font-mono text-3xl mb-8">{title}</h2>
    <div className="w-full max-w-[90vw] lg:max-w-[768px] px-4 md:px-12">
      {children}
    </div>
    <hr className="w-1/2 lg:w-1/4 xl:w-1/5 mt-14 mb-10 opacity-25" />
  </section>
);

export default SectionBody;
