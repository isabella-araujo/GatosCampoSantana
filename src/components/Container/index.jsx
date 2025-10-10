import './styles.css';

const Container = ({ children, className, ...props }) => {
  return (
    <div className={`container${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
