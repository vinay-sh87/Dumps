export const Card = ({ children, classname = "" }) => {
  return (
    <>
      <div className={`bg-white rounded-lg shadow-md p-6 ${classname}`}>
        {children}
      </div>
    </>
  );
};
