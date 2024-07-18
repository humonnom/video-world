const Label = ({
  children,
  required = false,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) => {
  return (
    <div className={'flex'}>
      <label htmlFor={htmlFor} className="block text-gray-700 font-bold mb-2">
        {children}
      </label>
      {required && <p>*</p>}
    </div>
  );
};

export default Label;
