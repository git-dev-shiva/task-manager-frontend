import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};
const PageLayout = ({ children, title }: Props) => {
  return (
    <section className="bg-[#ffffff] p-4 rounded-2xl  border border-neutral-300">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-indigo-950">{title}</h2>
      )}
      {children}
    </section>
  );
};

export default PageLayout;
